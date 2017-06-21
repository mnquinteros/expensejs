app.controller('IncomeController',
	function( $scope, $timeout, $firebaseArray, $http, myFactoryInc) {

	$scope.expenses = [];
    $scope.maxNumberOfExpenses = 50;
    $scope.firebaseUrl = 'https://indepfin-da201.firebaseio.com/incomes';

    $scope.getExpenses = function () {
        if ((angular.isNumber($scope.maxNumberOfExpenses)) && ($scope.maxNumberOfExpenses > 0)) {
            $scope.expenses = $firebaseArray(new Firebase($scope.firebaseUrl).limit($scope.maxNumberOfExpenses));	
        }
    };

    $scope.addExpense = function () {

        if ($scope.newExpense === undefined) {
            return;
        }
        if ($scope.newExpense.amount === undefined) {
            return;
        }
        if ($scope.newExpense.tags === undefined) {
            return;
        }

        if (isNaN(parseFloat($scope.newExpense.amount))) {
            return;
        }

        //var today = new Date();
        var newExpense = $scope.newExpense;
        $scope.expenses.$add({
            //date: today.toISOString(),
            date: newExpense.date.toISOString(),
            amount: newExpense.amount,
            cat: newExpense.cat,
            tags: newExpense.tags,

        });
        $scope.newExpense = {};
        $scope.newExpense.date = new Date();
        myFactoryInc.load();
    };

    $scope.updateExpense = function (expense) {
        $scope.expenses.$save(expense);
    };

    $scope.removeExpense = function (expense) {
        if (confirm('¿Esta seguro de que desea eliminar este elemento?')) {
            $scope.expenses.$remove(expense);
            myFactoryInc.load();
        }
    };

    $scope.totalExpenseAmount = function () {
        var sum = 0;
        for (var i = 0, v; v = $scope.expenses[i]; i++) {
            if (v.amount !== '') {
                sum += parseFloat(v.amount);
            }
        }
        return sum;
    };

    $scope.editExpense = function (expense) {
        expense.editing = true;
    };

    $scope.saveExpense = function (expense) {
        expense.editing = false;
        $scope.updateExpense(expense);
        myFactoryInc.load();
    };

    function init() {
        $scope.newExpense = {}
        $scope.newExpense.date = new Date();
        $scope.getExpenses();
    }
    init();

});
