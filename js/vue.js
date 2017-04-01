new Vue({
    el: 'main',
    data: {
        b64log: '',
        originalCommits: [],
        currentCommits: [],

    },
    methods: {
        importCommits: function () {
            var decoded = atob(this.b64log.replace(/\s+/g, ''));
            var commitsStr = decoded.split(/\n/);
            this.originalCommits = [];
            for (var c in commitsStr) {
                var splitted = commitsStr[c].split('*#');
                if (splitted.length !== 5) {
                    continue;
                }
                this.originalCommits.push({
                    sha: splitted[0],
                    name: splitted[1],
                    email: splitted[2],
                    timestamp: splitted[3],
                    date: moment.unix(splitted[3]).format('YYYY-MM-DD'),
                    time: moment.unix(splitted[3]).format('hh:mm:ss'),
                    datetime: moment.unix(splitted[3]).format('YYYY-MM-DD hh:mm:ss'),
                    message: splitted[4],
                    edited: {
                        'name': false,
                        'email': false,
                        'timestamp': false
                    }
                });
            }
            this.currentCommits = this.originalCommits;
        },

        initDatePickers: function () {
            this.$nextTick(function () {
                $('.datepicker').pickadate({
                    selectMonths: true, // Creates a dropdown to control month
                    selectYears: 15 // Creates a dropdown of 15 years to control year
                });
            });

        },

        log: function (stuff) {
            console.log(stuff);
        }
    }
});