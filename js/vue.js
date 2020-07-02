//noinspection JSUnusedGlobalSymbols
/* eslint-disable guard-for-in */

var br = '\n';

var steps = {
    import: [1, 'tab-import'],
    edit: [2, 'tab-edit'],
    export: [3, 'tab-export']
};

var v = new Vue({
    el: 'main',
    delimiters: ['[[', ']]'],
    data: {
        b64log: '',
        importFailure: false,
        originalCommits: [],
        currentCommits: [],
        bulks: [],
        authors: {email: [], name: []},
        bulkReplace: {email: {}, name: {}},
        step: 1,
        output: ''
    },
    methods: {
        // ==== Main methods ====

        /**
         * Decode a b64 string and create a commit list from it
         */
        importCommits: function () {
            // Decode input
            var decoded = b64DecodeUnicode(this.b64log.replace(/\s+/g, ''));
            if (decoded === 'INVALID_BASE64') {
                this.importFailure = true;
                return;
            }

            // Split into multiple lines
            var commitsStr = decoded.split(/\n/);
            this.originalCommits = [];
            this.currentCommits = [];

            for (var c in commitsStr) {
                var split = commitsStr[c].split('*#');
                if (split.length !== 5) {
                    this.importFailure = true;
                    return;
                }

                // Create a commit from the current line
                var commit = {
                    sha: split[0],
                    name: split[1],
                    email: split[2],
                    timestamp: split[3],
                    date: moment.unix(split[3]).format('YYYY-MM-DD'),
                    time: moment.unix(split[3]).format('HH : mm : ss'),
                    message: split[4],
                    edited: { // Used by the UI to know if a link has been clicked or not
                        'name': false,
                        'email': false,
                        'timestamp': false,
                        'date': false,
                        'time': false,
                        'message': false
                    }
                };
                this.originalCommits.push(clone(commit));
                this.currentCommits.push(clone(commit));
            }

            if (this.currentCommits.length > 0) {
                this.importFailure = false;
                this.changeStep('edit');
                this.extractAuthors();
                this.addBulk();
            }
        },

        /**
         * Compute bash script to display on export tab
         */
        exportScript: function () {
            var result = {env: '', msg: ''};

            // Generate the --env-filter command and the --msg-filter command
            for (var c in this.currentCommits) {
                var cc = this.currentCommits[c];
                var diff = computeDiff(cc, this.originalCommits[c]);
                if (diff.env) {
                    result.env = generateFilterEnvScript(diff, result.env, cc);
                }
                if (diff.msg) {
                    result.msg = generateFilterMsgScript(diff, result.msg, cc)
                }
                if (diff.env || diff.msg) {
                    result.oldest = cc.sha;
                }
            }

            // Generate the --env-filter for the bulk edit part
            result.bulk = generateBulkEditScript(this.bulkReplace);

            if (result.env.length + result.msg.length + result.bulk.length === 0) {
                this.output = '';
                return;
            }

            // Generate the whole script
            var script = 'git filter-branch ';
            if (result.env.length + result.bulk.length > 0) {
                script += '--env-filter \\' + br
                    + "'" + result.bulk + (result.bulk.length > 0  && result.env.length > 0 ? 'fi; ' : '')
                    + result.env + "fi' ";
            }
            if (result.msg.length > 0) {
                script += '--msg-filter \\' + br
                    + "'" + result.msg + 'else cat' + br + "fi' ";
            }

            if (!result.bulk && result.oldest) {
                script += result.oldest.substr(0, 7) + '^..HEAD' +  ' ';
            }

            script += '&& rm -fr "$(git rev-parse --git-dir)/refs/original/"' + br;

            this.output = script;
            this.$nextTick(function () {
                Prism.highlightElement($('#output')[0]);
            });
        },

        /**
         * Get a sample b64 string from a Gist
         */
        loadSampleData: function () {
            var self = this;
            var url = 'https://gist.githubusercontent.com/bokub/16c8e01d23153caf22ff9c5b81da9c5d/raw';
            $.get(url, function (data) {
                self.b64log = data;
            });
        },

        // ==== Regular edit methods ====

        /**
         * Remove every modifications made on a single commit
         */
        resetCommit: function (i) {
            var t = this.currentCommits.slice();
            t[i] = clone(this.originalCommits[i]);
            this.currentCommits = t;
        },

        // ==== Bulk edition methods ====

        /**
         * Add an empty bulk edit line
         */
        addBulk: function () {
            this.bulks.push({
                active: true,
                emailToggle: false,
                nameOptions: [],
                emailOptions: [],
                search: '',
                replace: ''
            });
            this.updateBulkLines();
        },

        /**
         * Remove an element from the bulk edit list.
         * Actually just hidden (active = false) to avoid problems with the jQuery components
         */
        removeBulk: function (index) {
            this.bulks[index].search = '';
            this.bulks[index].replace = '';

            var active = 0;
            for (var i = 0; i < this.bulks.length; i++) {
                active += this.bulks[i].active ? 1 : 0;
            }
            this.bulks[index].active = active <= 1;
            this.updateBulkLines();
        },

        /**
         * Extract a list of author names and emails, sorted by number of commits.
         */
        extractAuthors: function () {
            var loop = {name: {}, email: {}};

            // Count number of commits for each name/email
            for (var i = 0; i < this.originalCommits.length; i++) {
                var c = this.originalCommits[i];
                for (var l in loop) {
                    loop[l][c[l]] = loop[l][c[l]] ? loop[l][c[l]] + 1 : 1
                }
            }

            // Sort
            for (var k in loop) {
                var map = loop[k];
                this.authors[k] = Object.keys(map).sort(function (a, b) {
                    return map[b] - map[a];
                });
            }
        },

        /**
         * Ensure that the user cannot choose the same option in two different bulk edit lines.
         * Also, update the select component of each line, and reset replacement map for regular edit UI
         */
        updateBulkLines: function () {
            var self = this;
            var selected = {name: {}, email: {}};
            scanSelected(this.bulks, selected);

            // Ensure each select component has only unchosen options
            for (var j = 0; j < this.bulks.length; j++) {
                for (var l in selected) {
                    this.bulks[j][l + 'Options'] = arrayDiff(this.authors[l], Object.keys(selected[l]), this.bulks[j].search);
                }
            }

            // Save the replacements map
            for (var k in selected) {
                this.$set(this.bulkReplace, k, selected[k]);
            }

            // Update the select components
            this.$nextTick(function () {
                self.updateSelects();
            });
        },

        // ==== UI methods ====

        /**
         * Initialize tab behavior
         */
        initTabs: function () {
            var self = this;
            $(document).ready(function () {
                $('ul.tabs').tabs({
                    onShow: function (e) {
                        if (e.attr('id') === 'tab-export') {
                            self.exportScript();
                        }
                    }
                });
            });
        },

        /**
         * Switch to another tab
         * tabs.tabs is called two times because the animation is bugged
         */
        changeStep: function (step) {
            var tabs = $('ul.tabs');
            this.step = steps[step][0];
            this.$nextTick(function () {
                tabs.tabs('select_tab', steps[step][1]);
                tabs.tabs('select_tab', steps[step][1]);
                window.scrollTo(0, 0);
            });
        },

        /**
         * Update a value. Necessary because some inputs cannot bind with vue variables.
         */
        set: function (index, newValue, target) {
            if (['time', 'date'].indexOf(target) > -1) {
                this.currentCommits[index][target] = newValue ? newValue : this.originalCommits[index][target];
            } else if (['search', 'replace'].indexOf(target) > -1) {
                this.bulks[index][target] = newValue ? newValue : '';
                this.updateBulkLines();
            }
        },

        /**
         * Update the select components
         */
        updateSelects: function () {
            for (var i = 0; i < this.bulks.length; i++) {
                var $select = $('#bulk-search-' + i);
                $select.val(this.bulks[i].search).material_select();
            }
        },

        focus: function (sha, field) {
            focus(sha, field);
        }
    },

    /**
     * Called at page creation
     */
    created: function () {
        this.initTabs();
        initClipboard();
    }
});

/**
 * Clone an object and its properties
 */
function clone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
            if (typeof attr !== 'object')
                copy[attr] = clone(obj[attr]);
            else copy[attr] = obj[attr];
        }
    }
    return copy;
}

/**
 * Decode a base64 string, with unicode support
 */
function b64DecodeUnicode(str) {
    try {
        return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }
    catch (e) {
        return ('INVALID_BASE64')
    }
}

function generateFilterMsgScript(diff, result, cc) {
    result += result.length > 0 ? 'el' : '';
    result += 'if test "$GIT_COMMIT" = "' + cc.sha + '"; then' + br;
    result += diff.message !== null ? '    echo "' + escape(cc.message) + '"' + br : '';
    return result;
}

function generateFilterEnvScript(diff, result, cc) {
    var loop = {
        name: ['GIT_AUTHOR_NAME', 'GIT_COMMITTER_NAME'],
        email: ['GIT_AUTHOR_EMAIL', 'GIT_COMMITTER_EMAIL'],
        timestamp: ['GIT_AUTHOR_DATE', 'GIT_COMMITTER_DATE']
    };

    result += result.length > 0 ? 'el' : '';
    result += 'if test "$GIT_COMMIT" = "' + cc.sha + '"; then' + br;

    for (var l in loop) {
        if (diff[l]) {
            var val = escape(cc[l]);
            result = result
                + '    export ' + loop[l][0] + '="' + val + '"' + br
                + '    export ' + loop[l][1] + '="' + val + '"' + br;
        }
    }
    return result
}

/**
 * Generate bash script for bulk edit
 */
function generateBulkEditScript(bulkReplace) {
    var res = '';
    // Add bulk edit instructions
    var loop = {
        name: ['GIT_AUTHOR_NAME', 'GIT_COMMITTER_NAME'],
        email: ['GIT_AUTHOR_EMAIL', 'GIT_COMMITTER_EMAIL']
    };

    for (var l in loop) {
        for (var i in bulkReplace[l]) {
            if (bulkReplace[l][i]) {
                var val = escape(bulkReplace[l][i]);
                res += (res.length > 0 ? 'fi; ' : '')
                    + 'if test "$' + loop[l][0] + '" = "' + i + '" ||' + br
                    + '    test "$' + loop[l][1] + '" = "' + i + '"; then' + br
                    + '    export ' + loop[l][0] + '="' + val + '"' + br
                    + '    export ' + loop[l][1] + '="' + val + '"' + br
            }
        }
    }
    return res;
}

/**
 * Retrieve the values selected in the bulk edit lines
 */
function scanSelected(bulks, selected) {
    // Retrieve all names and emails selected
    for (var i = 0; i < bulks.length; i++) {
        var search = bulks[i].search;
        if (!search) {
            continue;
        }
        selected[bulks[i].emailToggle ? 'email' : 'name'][search] = bulks[i].replace;
    }
}

/**
 * Check for differences between an edited commit and the original one
 */
function computeDiff(current, original) {
    var diff = {
        env: false, // set to true if name, email, date or time changes
        msg: false, // set to true if message changes
        name: null,
        email: null,
        timestamp: null,
        message: null
    };

    // Compute new timestamp
    current.timestamp = moment(current.date + 'T' + current.time.replace(/ /g, '')).format('X');

    var fields = {'name': 'env', 'email': 'env', 'timestamp': 'env', 'message': 'msg'};

    for (var f in fields) {
        if (current[f] !== original[f]) {
            diff[f] = current[f];
            diff[fields[f]] = true;
        }
    }
    return diff;
}

/**
 * Textarea behavior when just clicked
 */
function initTextarea(el) {
    // Resize the textarea
    el.trigger('autoresize');
    setTimeout(function () { // Allow smooth transitions once resized
        el.removeClass('no-transition');
    }, 50);
    el.focus();
}

/**
 * Init the date picker when a date is clicked
 */
function initDatePicker(el) {
    Vue.nextTick(function () {
        el.pickadate({
            format: 'yyyy-mm-dd',
            closeOnSelect: true,
            clear: false,
            firstDay: 1
        });
        setTimeout(function () {
            el.focus();
        }, 50);
    });
}

/**
 * Initialize clipboard.js
 */
function initClipboard() {
    var clipboard = new Clipboard('.clipboard', {});

    clipboard.on('success', function () {
        Materialize.toast('Copied to clipboard', 1500);
    });
    clipboard.on('error', function () {
        Materialize.toast('Cannot copy to clipboard :(', 1500);
    });
}

/**
 * Init the time picker when a time is clicked
 */
function initTimePicker(el) {
    Vue.nextTick(function () {
        el.wickedpicker({now: el.val(), twentyFour: true, showSeconds: true, title: ''});
        setTimeout(function () {
            el.focus();
        }, 50);
    });
}

/**
 * Focus on an input (when link is clicked)
 */
function focus(sha, field) {
    Vue.nextTick(function () {
        var el = $('#' + sha).find('.commit-' + field + '> .input-field').find('input, textarea');
        if (field === 'date') {
            return initDatePicker(el);
        }
        if (field === 'time') {
            return initTimePicker(el);
        }
        if (field === 'message') {
            return initTextarea(el);
        }
        el.focus();
    });
}

/**
 * Convert special chars to include into bash script
 */
function escape(str) {
    return str.replace(/'/g, "'\\\''").replace(/(["`])/g, '\\\$1').replace(/[\r\n]/g, '\\n');
}

/**
 * Return the diff of two arrays, with an exception that should be kept.
 */
function arrayDiff(originalArray, newArray, exception) {
    return originalArray.filter(function (i) {
        return i === exception || newArray.indexOf(i) < 0;
    });
}
