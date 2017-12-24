var myApp = angular.module('eplApp', ["ngRoute"]);
//mainController start
myApp.controller('mainController', ['$http', '$q', function($http, $q) {
    var main = this;
    this.combinedData = [];
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
            main.combinedData = response1[0].data.rounds.concat(response1[1].data.rounds);
            //console.log(main.combinedData);

        }, function errorCallback(response) {

            alert("Error occurred. Check the console.");

        });
    } // end load all Data
    this.loadAllData();
}]); // end mainController
//matchViewController start
