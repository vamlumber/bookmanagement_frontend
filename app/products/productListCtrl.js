(function () {
    "use strict";
    angular
        .module("myApp")
        .controller("productListCtrl",
                    ["productResource",
                        productListCtrl]);

    function productListCtrl(productResource) {
        var vm = this;

        productResource.query(function(data) {
            vm.products = data;
        });
        vm.showImage = false;

        vm.toggleImage = function() {
            vm.showImage = !vm.showImage;
        }
    }
}());