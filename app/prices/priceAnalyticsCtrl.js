(function () {
	"use strict" ;

	angular.module('myApp')
	.controller('priceAnalyticsCtrl', ['$scope',"$filter","products","productServices" ,function($scope,$filter,products,productServices){

		$scope.title = "Price Analytics" ;

		//Compute Property
		for (var i = 0; i < products.length; i++) {
            products[i].marginPercent =
                productServices.calculateMarginPercent(products[i].price,
                                                        products[i].cost);
            products[i].marginAmount =
                productServices.calculateMarginAmount(products[i].price,
                                                        products[i].cost);
        }
        var orderedProductsAmount = $filter("orderBy")(products, "marginAmount");
        var filteredProductsAmount = $filter("limitTo")(orderedProductsAmount, 5);

        var chartDataAmount = [];
        for (var i = 0; i < filteredProductsAmount.length; i++) {
            chartDataAmount.push({
                x: filteredProductsAmount[i].productName,
                y: [filteredProductsAmount[i].cost,
                    filteredProductsAmount[i].price,
                    filteredProductsAmount[i].marginAmount]
            });
        }

        $scope.dataAmount = {
            series: ["Cost" , "Price" , "Margin Amount"],
            data: chartDataAmount
        };

        $scope.configAmount = {
            title: "Top $ Margin Products",
            tooltips: true,
            labels: false,
            mouseover: function () { },
            mouseout: function () { },
            click: function () { },
            legend: {
                display: true,
                position: "right"
            }
        };


        

        var orderedProductsPercent = $filter("orderBy")(products, "marginPercent");
        var filteredProductsPercent = $filter("limitTo")(orderedProductsPercent, 5);

        var chartDataPercent = [];
        for (var i = 0; i < filteredProductsPercent.length; i++) {
            chartDataPercent.push({
                x: filteredProductsPercent[i].productName,
                y: [filteredProductsPercent[i].marginPercent]
            });
        }

        $scope.dataPercent = {
            series: ["Margin %"],
            data: chartDataPercent
        };

        $scope.configPercent = {
            title: "Top % Margin Products",
            tooltips: true,
            labels: false,
            mouseover: function () { },
            mouseout: function () { },
            click: function () { },
            legend: {
                display: true,
                position: "right"
            }
        };

	}])
}());