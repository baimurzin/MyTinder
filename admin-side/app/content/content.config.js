/**
 * Created by vlad on 13.11.2015.
 */
(function () {
    "use strict";
    angular
        .module('admin')
        .config(ContentConfig);

    ContentConfig.$inject = ['$routeProvider'];

    function ContentConfig($routeProvider) {
        $routeProvider.when('/users', {
            controller: 'UsersController as ctrl',
            templateUrl: 'app/content/t/users.html',
            resolve: {

            }
        })
    }
})();