/**
 * Created by vlad on 13.11.2015.
 */
(function () {
    "use strict";
    angular
        .module('admin')
        .directive('sideMenu', SideMenuDirective);

    function SideMenuDirective() {
        return {
            templateUrl: 'app/directive/parts/t/menu.html',
            controller: 'MenuController as menu'
        }
    }
})();