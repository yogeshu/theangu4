myApp.controller('teamViewCtrl', ['$http', '$q', '$routeParams', function($http, $q, $routeParams) {
    var main = this;
    this.combinedData = [];
    this.totalMatchesPlayed1 = [];
    this.totalWins1 = [];
    this.totalLost1 = [];
    this.totaltie1 = [];
    this.totalgoals1 = 0;
    this.totalMatchesPlayed2 = [];
    this.totalWins2 = [];
    this.totalLost2 = [];
    this.totaltie2 = [];
    this.totalgoals2 = 0;
    this.totalMatchesPlayed = [];
    this.totalWins = [];
    this.totalLost = [];
    this.totaltie = [];
    this.totalgoals = 0;
    this.teamname1 = "";
    this.teamname2 = "";


    this.teamcode = $routeParams.teamcode;
    this.teamkey = $routeParams.teamkey;

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
            this.myNewData = [];
            this.myNewData1 = [];

            //console.log(response1);
            this.firstJsonRounds = response1[0].data.rounds;
            this.secondJsonRounds = response1[1].data.rounds;
            //console.log(response1[2].data.rounds);
            main.combinedData = response1[0].data.rounds.concat(response1[1].data.rounds);
            //console.log(main.combinedData);
            //function for epl 1
            function myJsFunction() {
                for (var i = 0; i < main2.firstJsonRounds.length; i++) {
                    for (var j = 0; j < main2.firstJsonRounds[i].matches.length; j++) {
                        main2.myNewData.push(main2.firstJsonRounds[i].matches[j]);
                    }
                }

                for (var i = 0; i < main2.myNewData.length; i++) {
                    if ((main2.myNewData[i].team1.code === main.teamcode || main2.myNewData[i].team2.code === main.teamcode) && (main2.myNewData[i].team1.key === main.teamkey || main2.myNewData[i].team2.key === main.teamkey)) {
                        //console.log(main2.myNewData[i].date);
                        //console.log(main2.myNewData[i].date);
                        main.totalMatchesPlayed1.push(main2.myNewData[i].team1.name);
                        //console.log(main.totalMatchesPlayed1.length);
                        //winstatus if
                        if (main2.myNewData[i].team1.code === main.teamcode && main2.myNewData[i].team1.key === main.teamkey) {
                            main.teamname1 = main2.myNewData[i].team1.name;




                            //totalgoals1 start
                            main.totalgoals1 = main.totalgoals1 + main2.myNewData[i].score1;
                            //totalgoals1 end
                            if (main2.myNewData[i].score1 > main2.myNewData[i].score2) {
                                //console.log("team win");
                                main.totalWins1.push(main2.myNewData[i].team2.code);

                            } else if (main2.myNewData[i].score1 < main2.myNewData[i].score2) {
                                //console.log("team  lost");
                                main.totalLost1.push(main2.myNewData[i].team1.code);


                            } else if (main2.myNewData[i].score1 == main2.myNewData[i].score2) {

                                //console.log("tie");
                                main.totaltie1.push(main2.myNewData[i].team1.code);


                            } else {
                                console.log(nothing);
                            }


                        }
                        //if fwinstay=tus end team 1
                        //if if team 2
                        if (main2.myNewData[i].team2.code === main.teamcode && main2.myNewData[i].team2.key === main.teamkey) {
                            //totalgoals1 start
                            main.totalgoals1 = main.totalgoals1 + main2.myNewData[i].score2;
                            //totalgoals1 end

                            if (main2.myNewData[i].score1 < main2.myNewData[i].score2) {
                                //console.log("team win");
                                main.totalWins1.push(main2.myNewData[i].team2.code);

                            } else if (main2.myNewData[i].score1 > main2.myNewData[i].score2) {
                                //console.log("team  lost");
                                main.totalLost1.push(main2.myNewData[i].team1.code);


                            } else if (main2.myNewData[i].score1 == main2.myNewData[i].score2) {

                                //console.log("tie");
                                main.totaltie1.push(main2.myNewData[i].team1.code);


                            } else {
                                console.log(nothing);
                            }
                        }
                        //if team 2 end
                    } //if for totalMatchesPlayed



                } // for loop myNewData

            }; //myJsFunction end
            myJsFunction();
            /* console.log(main.totalMatchesPlayed1.length);
            console.log(main.totalWins1.length);
            console.log(main.totalLost1.length);
            console.log(main.totaltie1.length);
            console.log(main.totalgoals1); */

            //function for epl2 start
            function myJsFunction1() {
                for (var i = 0; i < main2.secondJsonRounds.length; i++) {
                    for (var j = 0; j < main2.secondJsonRounds[i].matches.length; j++) {
                        main2.myNewData1.push(main2.secondJsonRounds[i].matches[j]);
                    }
                }
                //console.log(main2.myNewData1);
                for (var i = 0; i < main2.myNewData1.length; i++) {
                    if ((main2.myNewData1[i].team1.code === main.teamcode || main2.myNewData1[i].team2.code === main.teamcode) && (main2.myNewData1[i].team1.key === main.teamkey || main2.myNewData1[i].team2.key === main.teamkey)) {


                        main.totalMatchesPlayed2.push(main2.myNewData1[i].team1.name);
                        //winstatus if
                        if (main2.myNewData1[i].team1.code === main.teamcode && main2.myNewData1[i].team1.key === main.teamkey) {
                            main.teamname2 = main2.myNewData1[i].team1.name;

                            //totalgoals2 start
                            main.totalgoals2 = main.totalgoals2 + main2.myNewData[i].score1;
                            //totalgoals2 end
                            if (main2.myNewData1[i].score1 > main2.myNewData1[i].score2) {
                                main.totalWins2.push(main2.myNewData1[i].team2.code);

                            } else if (main2.myNewData1[i].score1 < main2.myNewData1[i].score2) {
                                main.totalLost2.push(main2.myNewData1[i].team1.code);


                            } else if (main2.myNewData1[i].score1 == main2.myNewData1[i].score2) {

                                main.totaltie2.push(main2.myNewData1[i].team1.code);


                            } else {
                                console.log(nothing);
                            }

                        }
                        //if fwinstay=tus end team 1
                        //if if team 2
                        if (main2.myNewData1[i].team2.code === main.teamcode && main2.myNewData1[i].team2.key === main.teamkey) {

                            //totalgoals2 start
                            main.totalgoals2 = main.totalgoals2 + main2.myNewData[i].score2;
                            //totalgoals2 end

                            if (main2.myNewData1[i].score1 < main2.myNewData1[i].score2) {
                                main.totalWins2.push(main2.myNewData1[i].team2.code);

                            } else if (main2.myNewData1[i].score1 > main2.myNewData1[i].score2) {
                                main.totalLost2.push(main2.myNewData1[i].team1.code);


                            } else if (main2.myNewData1[i].score1 == main2.myNewData1[i].score2) {

                                main.totaltie2.push(main2.myNewData1[i].team1.code);


                            } else {
                                console.log(nothing);
                            }
                        }
                        //if team 2 end
                    } //if for totalMatchesPlayed



                } // for loop myNewData1
            }; //myJsFunction end
            myJsFunction1();
            /* console.log(main.totalMatchesPlayed2.length);
            console.log(main.totalWins2.length);
            console.log(main.totalLost2.length);
            console.log(main.totaltie2.length);
            console.log(main.totalgoals2); */

            //total team stats
            main.totalMatchesPlayed = main.totalMatchesPlayed1.length + main.totalMatchesPlayed2.length;
            main.totalWins = main.totalWins1.length + main.totalWins2.length;
            main.totalLost = main.totalLost1.length + main.totalLost2.length;
            main.totaltie = main.totaltie1.length + main.totaltie2.length;
            main.totalgoals = main.totalgoals1 + main.totalgoals2;
            //log all stats
            /* console.log(main.totalMatchesPlayed);
            console.log(main.totalWins);
            console.log(main.totalLost);
            console.log(main.totaltie);
            console.log(main.totalgoals); */

            //total team stats
        }, function errorCallback(response) {

            alert("Error occurred. Check the console.");

        });
    } // end load all Data
    this.loadAllData();
}]); // end teamViewController
