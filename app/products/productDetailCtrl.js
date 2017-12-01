(function () {
    "use strict";

    angular
        .module("myApp")
        .controller("productDetailCtrl",
                    ["product","productServices",
                     ProductDetailCtrl]);

    function ProductDetailCtrl(product,productServices) {
        var vm = this;

        vm.product = product;

        vm.title = "Product Detail: " + vm.product.productName;

        if (vm.product.tags) {
            vm.product.tagList = vm.product.tags.toString();
        } 
        vm.marginPercent = productServices.calculateMarginPercent(vm.product.price , vm.product.cost);
    }
}());