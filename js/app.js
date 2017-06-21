var app = angular.module('overview', ['ngRoute', 'firebase', 'zingchart-angularjs']);

app.controller('PremiumController', function( $scope ) {

});

app.controller('PlanesController', function( $scope ) {

});

app.factory('myFactoryExp', ['$http', function ($http, $scope) {
        var myData = {};
        myData.data = '';
        myData.load = function () {
            this.data = $http.get('https://indepfin-da201.firebaseio.com/expenses.json').then(function (data) {
                return data;
                console.log("Click");
            });
            return this.data;
        };
        myData.get = function () {
            return this.data === '' ? this.load() : this.data;
        };
        return myData;
    }
]);

app.factory('myFactoryInc', ['$http', function ($http, $scope) {
        var myData = {};
        myData.data = '';
        myData.load = function () {
            this.data = $http.get('https://indepfin-da201.firebaseio.com/incomes.json').then(function (data) {
                return data;
                console.log("Click");
            });
            return this.data;
        };
        myData.get = function () {
            return this.data === '' ? this.load() : this.data;
        };
        return myData;
    }
]);

app.config(function($routeProvider) {
        $routeProvider

            .when('/', {
                templateUrl : 'views/resumen.html',
                controller  : 'OverviewController'
            })

            .when('/gastos', {
                templateUrl : 'views/gastos.html',
                controller  : 'ExpenseController'
            })

            .when('/ingresos', {
                templateUrl : 'views/ingresos.html',
                controller  : 'IncomeController'
            })

            .when('/inversiones', {
                templateUrl : 'views/inversiones.html',
                controller  : 'InversionesController'
            })

            .when('/premium', {
                templateUrl : 'views/premium.html',
                controller  : 'PremiumController'
            })

            .when('/resumen', {
                templateUrl : 'views/planes.html',
                controller  : 'PlanesController'
            });

    });

