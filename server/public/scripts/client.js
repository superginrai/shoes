console.log('JSSSSS');

let app = angular.module('ShoeApp', []);

app.controller('ShoeController', ['$http', function ($http) {
    console.log('ShoeController has been loaded');
    let self = this;
    //self.shoes = [];

    self.shoes = { data: '' };

    self.listShoes = function () {
        console.log('you clicked for shoes!!!')
        $http({
            method: 'GET',
            url: '/shoe'
        })
            .then(function (response) {
                console.log(response);
                self.shoes.data = response.data;
            })
            .catch(function (error) {
                console.log('error on /shoes GET', error);
            });
    }

    self.createShoe = function () {
        console.log('Add this shoe:', self.newShoe);
        $http({
            method: 'POST',
            url: '/shoe',
            data: self.newShoe
        })
            .then(function (response) {
                console.log('hoorah you got a shoe!', response);
                self.listShoes();
            })
            .catch(function (error) {
                console.log('error on /shoes POST', error);
            });
    }

    self.deleteShoe = function (yurShoe) {
        console.log(yurShoe, 'iz baleted')
        $http({
            method: 'DELETE',
            url: '/shoe',
            params: yurShoe
        })
            .then(function (response) {
                console.log(response);
                self.listShoes();
            })
            .catch(function (error) {
                console.log('error on shoe DELETE', error);
            });
    }

    self.updateShoe = function (yurShoe) {
        console.log(yurShoe, 'will get patches')
        $http({
            method: 'PUT',
            url: '/shoe',
            data: yurShoe
        })
            .then(function (response) {
                console.log(response);
                self.listShoes();
            })
            .catch(function (error) {
                console.log('error on /shoe PUT', error);
            });
    }

}])