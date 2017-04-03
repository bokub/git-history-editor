//noinspection JSUnusedGlobalSymbols
var v = new Vue({
    el: 'main',
    delimiters: ['[[', ']]'],
    data: {
        b64log: '',
        originalCommits: [],
        currentCommits: [],
        step: 1,
        output: '',

    },
    methods: {
        importCommits: function () {
            var decoded = atob(this.b64log.replace(/\s+/g, ''));
            var commitsStr = decoded.split(/\n/);
            this.originalCommits = [];
            this.currentCommits = [];

            for (var c in commitsStr) {
                var splitted = commitsStr[c].split('*#');
                if (splitted.length !== 5) {
                    continue;
                }
                var commit = {
                    sha: splitted[0],
                    name: splitted[1],
                    email: splitted[2],
                    timestamp: splitted[3],
                    date: moment.unix(splitted[3]).format('YYYY-MM-DD'),
                    time: moment.unix(splitted[3]).format('HH:mm:ss'),
                    datetime: moment.unix(splitted[3]).format('YYYY-MM-DD hh:mm:ss'),
                    message: splitted[4],
                    edited: {
                        'name': false,
                        'email': false,
                        'timestamp': false,
                        'date': false,
                        'time': false,
                    }
                };
                this.originalCommits.push(clone(commit));
                this.currentCommits.push(clone(commit));
            }

            if (this.currentCommits.length > 0) {
                this.changeStep('edit');
            }
        },

        resetCommit: function (i) {
            var t = this.currentCommits.slice();
            t[i] = clone(this.originalCommits[i]);
            this.currentCommits = t;
        },

        exportScript: function () {
            var br = '\n';
            var commitsToChange = 0;

            var script = ''
                // + '#!/usr/bin/env bash' + br
                + 'git filter-branch --env-filter \\' + br
                + '"';

            for (var c in this.currentCommits) {
                if (this.currentCommits.hasOwnProperty(c)) {
                    var diff = computeDiff(this.currentCommits[c], this.originalCommits[c]);
                    if(diff.identical){
                        continue;
                    }
                    var cc = this.currentCommits[c];

                    if (commitsToChange > 0) {
                        script += br + 'el';
                    }
                    script += "if test \\$GIT_COMMIT = '" + cc.sha + "'" + br
                        + "then" + br
                        + "    export GIT_AUTHOR_DATE='" + cc.timestamp + "'" + br
                        + "    export GIT_COMMITTER_DATE='" + cc.timestamp + "'" + br
                        + "    export GIT_AUTHOR_NAME='" + cc.name + "'" + br
                        + "    export GIT_COMMITTER_NAME='" + cc.name + "'" + br
                        + "    export GIT_AUTHOR_EMAIL='" + cc.email + "'" + br
                        + "    export GIT_COMMITTER_EMAIL='" + cc.email + "'" + br;

                    commitsToChange ++;
                }
            }
            script += 'fi" && rm -fr "$(git rev-parse --git-dir)/refs/original/"' + br;

            if(commitsToChange === 0){
                script = '';
            }

            this.output = script;
            this.$nextTick(function () {
                Prism.highlightElement($('#output')[0]);
            })
        },


        changeStep: function (step) {
            var tabs = $('ul.tabs');
            switch (step) {
                case 'import':
                    this.step = 1;
                    this.$nextTick(function () {
                        tabs.tabs('select_tab', 'tab-import');
                        tabs.tabs('select_tab', 'tab-import');
                    });
                    break;
                case 'edit':
                    this.step = 2;
                    this.$nextTick(function () {
                        tabs.tabs('select_tab', 'tab-edit');
                        tabs.tabs('select_tab', 'tab-edit');
                    });
                    break;
                case 'export':
                    this.step = 3;
                    this.$nextTick(function () {
                        tabs.tabs('select_tab', 'tab-export');
                        tabs.tabs('select_tab', 'tab-export');
                    });
                    break;
            }
        },

        initDatePickers: function () {
            this.$nextTick(function () {
                $('.datepicker').pickadate({
                    // selectMonths: true,
                    // selectYears: 5,
                    format: 'yyyy-mm-dd',
                    closeOnSelect: true,
                });
            });

        },

        initTabs: function () {
            var self = this;
            $(document).ready(function () {

                $('ul.tabs').tabs({
                    onShow: function (e) {
                        switch (e.attr('id')) {
                            case 'tab-export':
                                self.exportScript();
                                break;
                        }
                    }
                });
            });

        },

        initClipboard: function () {
            var clipboard = new Clipboard('.clipboard');

            clipboard.on('success', function () {
                Materialize.toast('Copied to clipboard', 1500);
            });
            clipboard.on('error', function () {
                Materialize.toast('Cannot copy to clipboard :(', 1500);
            });
        },

        log: function (stuff) {
            console.log(stuff);
        }
    },

    created: function () {
        this.initTabs();
        this.initClipboard();
    }
});

function clone(obj) {
    if (obj === null || typeof obj !== "object") return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
            if (typeof attr !== "object")
                copy[attr] = clone(obj[attr]);
            else copy[attr] = obj[attr];
        }
    }
    return copy;
}

function computeDiff(current, original) {
    var diff = {
        identical: true,
        name: null,
        email: null
    };

    if (current.name !== original.name) {
        diff.name = current.name;
        diff.identical = false;
    }
    if (current.email !== original.email) {
        diff.email = current.email;
        diff.identical = false;
    }
    return diff;
}