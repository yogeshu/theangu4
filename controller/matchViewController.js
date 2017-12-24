myApp.controller('matchViewController', ['$http', '$q', '$routeParams', function($http, $q, $routeParams) {
    var main = this;
    this.combinedData = [];
    this.teamName1 = "";
    this.teamName2 = "";
    this.teamCode1 = "";
    this.teamCode2 = "";
    this.teamKey1 = "";
    this.teamKey2 = "";
    this.teamScore1 = "";
    this.teamScore2 = "";
    this.roundName = "";
    this.matchDate = "";

    this.date = $routeParams.date;
    //console.log(main.date);
    this.team1code = $routeParams.team1code;
    this.team2code = $routeParams.team2code;
    this.loadAllData = function() {
        main.firstJson = $http.get('https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json', {
            cache: false
        });
        main.secondJson = $http.get('https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json', {
            cache: false
        });
        $q.all([main.firstJson, main.secondJson]).then(function successCallback(response1) {
            var main2 = this;
            this.firstJsonRounds = [];
            this.secondJsonRounds = [];
            //console.log(response1);
            this.firstJsonRounds = response1[0].data.rounds;
            this.secondJsonRounds = response1[1].data.rounds;
            //console.log(response1[2].data.rounds);
            main.combinedData = response1[0].data.rounds.concat(response1[1].data.rounds);

            function myJsFunction() {
                for (var i = 0; i < main.combinedData.length; i++) {
                    //console.log(main.combinedData[i]);
                    var myNewData = main.combinedData[i];
                    for (var j = 0; j < myNewData.matches.length; j++) {
                        //console.log(myNewData.matches[j]);
                        main.roundName = main.combinedData[i].name;
                        var dateNew = myNewData.matches[j].date;
                        dateNew = dateNew.replace(/[^\/\d]/g, '');
                        //console.log(dateNew);
                        if (dateNew == main.date && myNewData.matches[j].team1.code == main.team1code && myNewData.matches[j].team2.code == main.team2code) {
                            /*console.log(myNewData.matches[j].date);
                            console.log(myNewData.matches[j].team1.name);
                            console.log(myNewData.matches[j].team2.name);
                            console.log(myNewData.matches[j].score1);
                            console.log(myNewData.matches[j].score2); */

                            //transfering data to matchview.controller.main

                            main.matchDate = myNewData.matches[j].date;
                            main.teamName1 = myNewData.matches[j].team1.name;
                            main.teamName2 = myNewData.matches[j].team2.name;
                            main.teamCode1 = myNewData.matches[j].team1.code;
                            main.teamCode2 = myNewData.matches[j].team2.code;
                            main.teamKey1 = myNewData.matches[j].team1.key;
                            main.teamKey2 = myNewData.matches[j].team2.key;
                            main.teamScore1 = myNewData.matches[j].score1;
                            main.teamScore2 = myNewData.matches[j].score2;

                        }
                    }
                }
            }; //myJsFunction end
            myJsFunction();
        }, function errorCallback(response) {

            alert("Error occurred. Check the console.");
            console.log(response);

        });
    } // end load all Data
    this.loadAllData();
}]); // end matchViewController

