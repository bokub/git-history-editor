//noinspection JSUnusedGlobalSymbols
var v = new Vue({
    el: 'main',
    delimiters: ['[[', ']]'],
    data: {
        b64log: 'M2EwMTFhMDNkODM3NjQ2OGJhZTc4YzA4N2FiMzA3ZWIzMGJmZDdiMSojQm9yaXMgS3ViaWFrKiNi a3ViaWFrQGRldmF0aWNzLmNvbSojMTQ5MTIyODcyNiojQWRkIEdldFR5cGUoKSB0byBlbnRpdGll cwpiMDlmNjI1ZjQ5Y2E4NzcyNjE3MDBiNDBmZTE0MzgwNTZiYzg5ZTU5KiNCb3JpcyBLdWJpYWsq I2JrdWJpYWtAZGV2YXRpY3MuY29tKiMxNDkxMjI4MjA5KiNBZGQgaW5fc3RvY2sgY29uZGl0aW9u CmQ4YjMyOTgxOTJjZWQyNDUzY2ViNzkxYWJjMmFjY2Y1NWY1MzE4MmEqI0JvcmlzIEt1Ymlhayoj Ymt1Ymlha0BkZXZhdGljcy5jb20qIzE0OTEyMjcwMzMqI0FkZCBhIFNNUyBjYWxsZXIKMjlkNzRm YjA0ZTQ3YWZhMTM1N2QxZmM4N2ViMTk5OTY3ODIyODM5MSojQm9yaXMgS3ViaWFrKiNia3ViaWFr QGRldmF0aWNzLmNvbSojMTQ5MTIyNTQ0NiojR2xpZGUgdXBkYXRlCjY4ODZjNzBjMzE2NWRjYWVm YmM5MjhlZGQ1YTg3NmIxMGE5OTBjNTcqI3NndWVyeSojc2d1ZXJ5QGRldmF0aWNzLmNvbSojMTQ5 MTIyNTMzMSojVU5JRlktMTE2IHNldCBzdGF0ZSBuZXcgdmVyc2lvbiB3aXRoIGFyZ3MKMjU4NmM2 YTk1Y2RjNDllNzE1MmY4OThlMjgwMDllMjg1ZTNlNGU3YyojQ8OpbGlhbiBIYXJhc3NlKiNjaGFy YXNzZUBkZXZhdGljcy5jb20qIzE0OTEyMjQ0OTgqI0ZpeCBjb25maWcgcmVhZAo5OTQ2OTA1Yjc4 ZWM1ODE3N2E3OGExZmZmNzg4NmE4MWRjMDg2MTJkKiNDw6lsaWFuIEhhcmFzc2UqI2NoYXJhc3Nl QGRldmF0aWNzLmNvbSojMTQ5MTIyMTgyOSojQnVpbGQgc3RhdGUgbWFjaGluZXMgZnJvbSBjb25m aWcKZWU4MTQ4YzAzN2IzNmUxOWU1ODBkZjA2ZDE2NjFiZTRmZDA2NGI3ZiojQm9yaXMgS3ViaWFr KiNia3ViaWFrQGRldmF0aWNzLmNvbSojMTQ5MTIyMTA4MCojQWRkIG5ldyBjb25kaXRpb25zCjgx YjhhZjFlNjA5MzRkNTVmYWE4ODc3MTViMDBkYThiZGY0ZjE0ZTQqI0JvcmlzIEt1YmlhayojYmt1 Ymlha0BkZXZhdGljcy5jb20qIzE0OTEyMTM3NTcqI1JlbW92ZSBjYXNzYW5kcmEgZnJvbSBjb21w b3NlLWRldgpkMWRkNzJlZmJiYjdlMzQ4MWIwMDAyMTI4ZjI4NmY2YmIwY2U2NzUzKiNCb3JpcyBL dWJpYWsqI2JrdWJpYWtAZGV2YXRpY3MuY29tKiMxNDkxMjEzNTA4KiNSZWZhY3RvciBHZXR0ZXJz CjgwMDI4MzcyOTE4YTFmNzcwMDllNmYyNTdiMjJkMGJiMzYyZDQ2MjgqI0JvcmlzIEt1Ymlhayoj Ymt1Ymlha0BkZXZhdGljcy5jb20qIzE0OTEyMTI3NDEqI0NvZGUgY2xlYW51cApmZTA1MGU1NjY3 ZTgxZDFhN2UzMTEwMmY4MGU3M2E0NTJlOTEwZmYwKiNCb3JpcyBLdWJpYWsqI2JrdWJpYWtAZGV2 YXRpY3MuY29tKiMxNDkxMjEwODM3KiNBZGQgYSBnZXR0ZXIgYW5kIDIgY29uZGl0aW9ucwo2MTVj MzY2NjZhMmQzZGVkNDkyNTEyYjg1YjYxNzQzZmE2NTY4YWQ2KiNCb3JpcyBLdWJpYWsqI2JrdWJp YWtAZGV2YXRpY3MuY29tKiMxNDkxMjA5OTM0KiNGaXgganNvbiBrZXkgaW4gbGluZUl0ZW0KZjVh Y2FkMmVmYmRhMGUzMjllNGQ1ZGE5YjM3MGQ1ZDVmZjcwN2I2YyojQm9yaXMgS3ViaWFrKiNia3Vi aWFrQGRldmF0aWNzLmNvbSojMTQ5MTIwOTgzMiojQSBsaW5lSXRlbSBoYXMgT05FIHBpZWNlIGFu ZCBPTkUgcGFyY2VsCjIyYzI0Mjc1MjM1MzYwNDhlYzkxMTUwZDdjZGFiNmIyYTBmODAwMmIqI0Jv cmlzIEt1YmlhayojYmt1Ymlha0BkZXZhdGljcy5jb20qIzE0OTEyMDc1MTEqI0FkZCBjb21tZW50 cyBpbiBjb2RlCjZmNjVlYTRmMmEyNDdhOTA3Y2ZlMjRjMzU4Y2RmMGZjNzg2NmY3M2EqI0Jvcmlz IEt1YmlhayojYmt1Ymlha0BkZXZhdGljcy5jb20qIzE0OTEyMDYxNTcqI1VwZGF0ZSBjb21wb3Nl LWRldiB0byB2MyBBZGQgY29uZi1yZWFkZXIgaW1hZ2UKMjRiMTRiMjQyN2FkYjM0NDlhNTg1ZTE0 ZjI2NWFlOTRjNDk1OTljMCojQm9yaXMgS3ViaWFrKiNia3ViaWFrQGRldmF0aWNzLmNvbSojMTQ5 MDk3NjA2OSojbW92ZSBjYXN0UGFyYW1zIHRvIHV0aWxzCmU3YzA3MmJlNjMyMzA4ODdjODMzMzE3 YmU3NDg1MDg1MTMzNjYxNGQqI0JvcmlzIEt1YmlhayojYmt1Ymlha0BkZXZhdGljcy5jb20qIzE0 OTA5NzU4ODMqI0FkZCBjb25kaXRpb24gdXNpbmcgc2l0ZUlkIGFuZCBjdHgKMTcyNzU1NTJmNDg1 ZGZkMzcxMTMyZmRlYmYzYWNkNmQ3YjUwNTJkNiojQm9yaXMgS3ViaWFrKiNia3ViaWFrQGRldmF0 aWNzLmNvbSojMTQ5MDk2NDgzMSojQWRkIHVuaXQgdGVzdHMKMmFlMWU1MWRlZDEwODNiN2M2MmY5 ZmE1Zjk0ZGQxY2NjMmQ0MTUyYSojQ8OpbGlhbiBIYXJhc3NlKiNjaGFyYXNzZUBkZXZhdGljcy5j b20qIzE0OTA5NjQ3NTgqI1JlZm9ybWF0IGNvZGUKZDQ1MDM1MDVlYTdlZTY2OGNkNzk1MmI2MmE0 YzY3YjRjNzY0YjM2Niojc2d1ZXJ5KiNzZ3VlcnlAZGV2YXRpY3MuY29tKiMxNDkwOTYyOTExKiN2 ZXJzaW9ucywgc2V0U3RhdGUKZDIwZjVjM2U1ODQzMGE1NDUwYjQwODkwOWRhNjE4MjRkZDFlMjZl NiojQm9yaXMgS3ViaWFrKiNia3ViaWFrQGRldmF0aWNzLmNvbSojMTQ5MDk1NDk3NSojQ3JlYXRl IGNvbmRpdGlvbi1mYWN0b3JpZXMgYXQgYm9vdHN0cmFwCmYxMzdmYWQ4NjdhMmNhNjVhNGEwYzU1 ZTNlYmNjYTRjMDkyM2QzYjcqI0JvcmlzIEt1YmlhayojYmt1Ymlha0BkZXZhdGljcy5jb20qIzE0 OTA5NDQzNzUqI0FkZCAiaHR0cDovLyIgd2hlbiBjYWxsaW5nIGNvbmZSZWFkZXIKZjBjNjY4YTI5 MTVmNjg1NmRmZGE2ZDM0ODE5MTFlMWYwOGZhODE1Yyojc2d1ZXJ5KiNzZ3VlcnlAZGV2YXRpY3Mu Y29tKiMxNDkwNzc1NTU5KiNNb2RpZmljYXRpb24gYWZ0ZXIgZGVtbyA6IDIwNCBzdGF0dXMsIGxh c3QgdXBkYXRlCjA5MzRlNmI5MjQ0ZTY3ZmRjOTFiZTQ3OGJmNWRlMzljZDU3YTZhYTMqI3NndWVy eSojc2d1ZXJ5QGRldmF0aWNzLmNvbSojMTQ5MDcwNDc1NyojVU5JRlktODkgZGVidWcgdXBkYXRl IGVudGl0aWVzIHdpdGggcGF0Y2gKMzgxZDI4N2EwNTI2MDUzNWJjZTRlZWZmOWU1MDlmZWU0NGEy MTdmNyojQm9yaXMgS3ViaWFrKiNia3ViaWFrQGRldmF0aWNzLmNvbSojMTQ5MDY5NTM4OCojQWRk IGh0dHA6Ly8gd2hlbiBjYWxsaW5nIGNvbmYtcmVhZGVyCmRjZjZjNjY5ZjAyYmYyOTNhNmY1MzAy ZmUzMTdiNDFmNzVhOWRhNTQqI3NndWVyeSojc2d1ZXJ5QGRldmF0aWNzLmNvbSojMTQ5MDYzMDQ4 NCojVU5JRlktOTEgODktOTAtOTEgZmluZCBhIHBhcmNlbCB3aXRoIGVuZHBvaW50IGZpbHRlciwg bGluZV9pdGVtcyBoYW5kbGVyLCBvcmRlciBoYW5kbGVyCmI5NTdmMjdkN2ZjNGMzZGFlMjJiMDAx YTkzMmJlNzA4ZDc5YzE2N2UqI3NndWVyeSojc2d1ZXJ5QGRldmF0aWNzLmNvbSojMTQ5MDM3NTEz MSojVU5JRlktMTAwIFVOSUZZLTI2IG9yZGVyIGhhbmRsZXJzCjI0MjU0ZDdmMTQ1NDQ5NWMzZWJm YzIzOGU1YTA2Yzc2ODg2OWMwMjcqI3FsZWJhcyojcWxlYmFzQGRldmF0aWNzLmNvbSojMTQ5MDE5 MzEyMSojVW5pL3JhYmJpdAo4YzMzYWY3ZGY5MDMwYzVlZjE5Yzk4Njg5YWRhNGMzZDVjYzU0Y2Yy KiNxbGViYXMqI3FsZWJhc0BkZXZhdGljcy5jb20qIzE0OTAxOTIwMTkqI1VuaS9yYWJiaXQgdXNh Z2UKYWU5ZDQ5MjNjNDk3NWY2N2Y2NzUyZGQyYjk2ZTdiYjgyNTc2ZTA2MSojc2d1ZXJ5KiNzZ3Vl cnlAZGV2YXRpY3MuY29tKiMxNDg5NzQzNDMwKiNVTklGWS0yNiBwYXJjZWxzIGZ1bmN0aW9ucyBm b3IgYWRkaW5nIGFuZCBzZXR0aW5nIEVuZFBvaW50cyAoYmVjYXVzZSBpdCBpcyBhIG1hcCBhbmQg YSBtYXAgY2FuIGJlIGVtcHR5IGFuZCByaXNlIGVycm9ycykKNWZhNjQxZDVkY2QwOTIxMDg2YzMz MTI4YzA2ZGU4YjEzYWRkNjk0YSojc2d1ZXJ5KiNzZ3VlcnlAZGV2YXRpY3MuY29tKiMxNDg5Njgz NjA5KiNVTklGWS0yNiByZW1vdmVyIGVudGl0aWVzLCB0aW1lIGZpZWxkcyBoYXMgdGltZSB0eXBl IChub3Qgc3RyaW5nIGFueW1vcmUpLCByZXF1ZXN0IGVudGl0aWVzIGJldHdlZW4gMiBkYXRlcwph NjBiOWEwYWNmM2NjN2JjMzc3MDk4Nzg0YTU1YzQ0YWVkMGUxOGYwKiNDw6lsaWFuIEhhcmFzc2Uq I2NoYXJhc3NlQGRldmF0aWNzLmNvbSojMTQ4OTY3NTUyNyojRml4IGRvY2tlci10ZXN0CmE0MzVm YmZkZGVjMDllZGJhYzAwNTBlZTg1NTM4NTZjZTJiZGEyODUqI3FsZWJhcyojcWxlYmFzQGRldmF0 aWNzLmNvbSojMTQ4OTY1NTQ2MCojRml4dXAKYmIyODY3MWJlZjkzOGVjOTA0NzFjY2Q2NTQ2OTk1 MDY1ZmZkNTQwZiojcWxlYmFzKiNxbGViYXNAZGV2YXRpY3MuY29tKiMxNDg5NjU1MzE3KiNGaXh1 cCBjb25maWcgbGlzdGVuZXIgc3RhcnQKMTA0Mzc5NDUxY2EwOThlZmQ0OTUxMGRkYzA2MjA0ZjA4 OGY2MTlhNCojc2d1ZXJ5KiNzZ3VlcnlAZGV2YXRpY3MuY29tKiMxNDg5NTkxMTY0KiNVTklGWS0y NiBvbXN0aW1lIGNlbnRyYWxpemVzIHRpbWUgZm9ybWF0YWdlCjViMDIxNzRkZmRlMTIwNjRhY2Rj NzJhYjliNDdlZTVlZDM0NmY5ZmMqI3NndWVyeSojc2d1ZXJ5QGRldmF0aWNzLmNvbSojMTQ4OTU4 NDY4NSojVU5JRlktMjYgZW50aXRpZXMsIHJlcG9zaXRvcmllcyAoZmluZCwgaW5zZXJ0LCB1cGRh dGUpLCBlbnRpdHkgZnVuY3Rpb25zIGZvciBjaGFuZ2luZyBzdGF0ZQplNmEwYWVhMzUyZGY0MWY3 MzNhNTVjNjI5MDM0ZjI0Njg1ZDJhNTAxKiNDw6lsaWFuIEhhcmFzc2UqI2NoYXJhc3NlQGRldmF0 aWNzLmNvbSojMTQ4OTQxMDMwNiojRm9yayBza2VsZXRvbg== ',
        originalCommits: [],
        currentCommits: [],
        step: 1,
        output: ''

    },
    methods: {
        importCommits: function () {
            var decoded = b64DecodeUnicode(this.b64log.replace(/\s+/g, ''));
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
                        'time': false
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

        setDate: function (i, newDate) {
            if (newDate !== '' && newDate !== null && typeof newDate !== 'undefined') {
                this.currentCommits[i].date = newDate;
                return;
            }
            this.currentCommits[i].date = this.originalCommits[i].date;
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
                    if (diff.identical) {
                        continue;
                    }
                    var cc = this.currentCommits[c];

                    if (commitsToChange > 0) {
                        script += br + 'el';
                    }
                    script = script
                        + "if test \\$GIT_COMMIT = '" + cc.sha + "'" + br
                        + "then" + br;

                    if (diff.name !== null) {
                        script = script
                            + "    export GIT_AUTHOR_NAME='" + cc.name + "'" + br
                            + "    export GIT_COMMITTER_NAME='" + cc.name + "'" + br
                    }
                    if (diff.email !== null) {
                        script = script
                            + "    export GIT_AUTHOR_EMAIL='" + cc.email + "'" + br
                            + "    export GIT_COMMITTER_EMAIL='" + cc.email + "'" + br;
                    }
                    if (diff.timestamp !== null) {
                        script = script
                            + "    export GIT_AUTHOR_DATE='" + cc.timestamp + "'" + br
                            + "    export GIT_COMMITTER_DATE='" + cc.timestamp + "'" + br
                    }
                    commitsToChange++;
                }
            }
            script += 'fi" && rm -fr "$(git rev-parse --git-dir)/refs/original/"' + br;

            if (commitsToChange === 0) {
                console.log('Nothing to change');
                script = '';
            }

            this.output = script;
            console.log(this.output);
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
            var self = this;
            this.$nextTick(function () {
                $('.datepicker').pickadate({
                    format: 'yyyy-mm-dd',
                    closeOnSelect: true,
                    clear: false,
                    firstDay: 1
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
            var clipboard = new Clipboard('.clipboard', {});

            clipboard.on('success', function () {
                Materialize.toast('Copied to clipboard', 1500);
            });
            clipboard.on('error', function () {
                Materialize.toast('Cannot copy to clipboard :(', 1500);
            });
        },

        log: function (x) {
            console.log(x);
        }
    },

    created: function () {
        this.initTabs();
        this.initClipboard();
    }
});

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

function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

function computeDiff(current, original) {
    var diff = {
        identical: true,
        name: null,
        email: null,
        timestamp: null
    };

    // Compute new timestamp
    current.timestamp = moment(current.date + 'T' + current.time).format('X');

    if (current.name !== original.name) {
        diff.name = current.name;
        diff.identical = false;
    }
    if (current.email !== original.email) {
        diff.email = current.email;
        diff.identical = false;
    }
    if (current.timestamp !== original.timestamp) {
        diff.timestamp = current.timestamp;
        diff.identical = false;
    }
    return diff;
}