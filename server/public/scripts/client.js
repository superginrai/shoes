app.controller('ShoeController', ['$http', function ($http) {
    console.log('ShoeController has been loaded');
    let self = this;


    self.listShoes = function () {
        $http({
            method: 'GET',
            url: '/shoes'
        })
            .then(function (response) {
                console.log(response);
                self.things = response.data;
            })
            .catch(function (error) {
                console.log('error on /shoes GET', error);
            });
    }

    self.createShoe = function () {
        console.log('Add this shoe:', self.newShoe);
        $http({
            method: 'POST',
            url: '/shoes',
            data: self.newShoe
        })
            .then(function (response) {
                console.log('hoorah you got a shoe!', response);
                self.listThings();
            })
            .catch(function (error) {
                console.log('error on /shoes POST', error);
            });
    }
}])