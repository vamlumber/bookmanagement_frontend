(function () {
    "use strict";

    angular
        .module("myApp")
        .controller("productEditCtrl",
                    ["product","$state","productServices",
                     ProductEditCtrl]);

    function ProductEditCtrl(product,$state,productServices) {
        var vm = this;

        vm.product = product;
        vm.priceOption = "percent";

        vm.marginPercent = function () {
            return productServices.calculateMarginPercent(vm.product.price , vm.product.cost);
        }

        vm.calculatePrice = function () {
            
            var price = 0;
            if (vm.priceOption == 'amount') {
                price = productServices.calculatePriceFromAmount(vm.product.cost,vm.markupAmount)
            } 
            if (vm.priceOption == 'percent') {
                price = productServices.calculatePriceFromPercent(vm.product.cost , vm.markupPercent)
            }
            vm.product.price = price ;
        }

        if (vm.product && vm.product.productId) {
            vm.title = "Edit :" + vm.product.productName ;
        }
        else{
            vm.title = "New Product" ;
        }
        vm.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.opened = !vm.opened ;
        }
        vm.submit = function (isValid) {
           if (isValid) {
                vm.product.$save(function (data) 
                {
                    toastr.success("Save Successful");
                }) 
            } else {
                alert("Complete The form Validation");
            }
        };
        vm.cancel = function () {
            $state.go('productList');
        }
        vm.addTags = function (tags) {
            if(tags){
                var array = tags.split(',');
                vm.product.tags= vm.product.tags ? vm.product.tags.concat(array) : array ;
                vm.newTags = '';           
            }else{
                alert("Please Enter more than one tags seperated with commas");
            }
        }
        vm.removeTag = function(idx) {
            vm.product.tags.splice(idx,1);
        };

    }
}());
