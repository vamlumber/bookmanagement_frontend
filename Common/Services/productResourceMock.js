(function () {
	"use strict";
	var app= angular.module("productResourceMock", ["ngMockE2E"]);
	app.run(function ($httpBackend) {
		var products =[ {
			"productId" : 1 ,
			"productName" : "Who Moved My Cheese" ,
			"productCode" : "GDN-0011",
			"releaseDate" : "March 19 1998" ,
			"description" : "Who Moved My Cheese? An Amazing Way to Deal with Change in Your Work and in Your Life, published on September 8, 1998, is a motivational business fable.",
			"cost" : 9.00 ,
			"price" : 19.95 ,
			"category" : "Motivational" ,
			"tags" : ["mouse" ,"cheese" ] ,
			"imageUrl" : "image/1.jpg"
		} ,
		{ 
			"productId" : 2 ,
			"productName" : "3 Mistakes of My Life" ,
			"productCode" : "GDN-0023",
			"releaseDate" : "March 18 2008" ,
			"description" : "The best selling feature of a Chetan Bhagat book is its readability. In a world where one is constantly striving to find time, it truly matters when you can actually finish reading a book within a couple of hours.",
			"cost" : 20.00 ,
			"price" : 32.99 ,
			"category" : "Fiction" ,
			"tags" : ["omi" ,"Ish","Life" ] ,
			"imageUrl" : "image/2.jpg"

		},
		{

			"productId" : 5 ,
			"productName" : "The Alchemist" ,
			"productCode" : "TBX-0048",
			"releaseDate" : "May 21 2013" ,
			"description" : "The Alchemist follows the journey of an Andalusian shepherd boy named Santiago. Believing a recurring dream to be prophetic, he asks a Romani fortune-teller in a nearby town about its meaning. The woman interprets the dream as a prophecy telling the boy that he will discover a treasure at the Egyptian pyramids." ,
			"cost" : 1.00 ,
			"price" : 8.99 ,
			"category" : "Motivation" ,
			"tags" : ["Gold","Hope" ] ,
			"imageUrl" : "image/3.jpg"

		},
		{

			"productId" : 8 ,
			"productName" : "The immortals of meluha" ,
			"productCode" : "TBX-0022",
			"releaseDate" : "May 15 2009" ,
			"description" : "Meluha is a near perfect empire, created many centuries earlier by Lord Ram, one of the greatest kings that ever lived. However, the once proud empire and its Suryavanshi rulers face severe crisis as its primary river, the revered Saraswati, is slowly drying to extinction." ,
			"cost" : 6.95 ,
			"price" : 11.55 ,
			"category" : "Fiction" ,
			"tags" : ["Kingdom","Shiva" ] ,
			"imageUrl" : "image/4.jpg"

		},
		{

			"productId" : 10 ,
			"productName" : "Da Vinci Code" ,
			"productCode" : "TBX-0042",
			"releaseDate" : "October 15 2006" ,
			"description" : "Louvre curator and Priory of Sion grand master Jacques Saunière is fatally shot one night at the museum by an albino Catholic monk named Silas, who is working on behalf of someone he knows only as the Teacher" ,
			"cost" : 2.22 ,
			"price" : 35.95 ,
			"category" : "Fiction" ,
			"tags" : ["cypher","Code","action" ] ,
			"imageUrl" : "image/5.jpg"

		}];
		var productUrl = "/api/products" ;
		$httpBackend.whenGET(productUrl).respond(products);

        var editingRegex = new RegExp(productUrl + "/[0-9][0-9]*", '');
        $httpBackend.whenGET(editingRegex).respond(function (method, url, data) {
            var product = {"productId": 0};
            var parameters = url.split('/');
            var length = parameters.length;
            var id = parameters[length - 1];

            if (id > 0) {
                for (var i = 0; i < products.length; i++) {
                    if (products[i].productId == id) {
                        product = products[i];
                        break;
                    }
                };
            }
            return [200, product, {}];
        });

        $httpBackend.whenPOST(productUrl).respond(function (method, url, data) {
            var product = angular.fromJson(data);

            if (!product.productId) {
                // new product Id
                product.productId = products[products.length - 1].productId + 1;
                products.push(product);
            }
            else {
                // Updated product
                for (var i = 0; i < products.length; i++) {
                    if (products[i].productId == product.productId) {
                        products[i] = product;
                        break;
                    }
                };
            }
            return [200, product, {}];
        });
        $httpBackend.whenGET(/app/).passThrough();
		//$httpBackend.whenGET(/^\/app/*/Product\//).passThrough();
		//$httpBackend.whenGET('app/Product/productListView.html').passThrough();
	})
}());
