/**
 * Created by YUE on 2017/3/29.
 */
var Yike = angular.module("Yike",["ngRoute","Ctrls","Directives"]);
Yike.config(["$routeProvider",function ($routeProvider) {
    $routeProvider.when("/today",{
        templateUrl:"./views/today.html",
        controller:"todayCtrl"
    }).when("/older",{
        templateUrl:"./views/older.html",
        controller:"olderCtrl"
    }).when("/author",{
        templateUrl:"./views/author.html",
        controller:"authorCtrl"
    }).when("/category",{
        templateUrl:"./views/category.html",
        controller:"cateCtrl"
    }).when("/settings",{
        templateUrl:"./views/settings.html",
        controller:"setCtrl"
    }).otherwise({
        redirectTo:"/today"
    });
}]);

//在根作用域下添加一个方法，这个方法可以被任一控制器访问到
Yike.run(["$rootScope",function ($rootScope) {
    $rootScope.collapsed = false;
    $rootScope.loaded = false;
    $rootScope.toggle = function () {
        $rootScope.collapsed = !$rootScope.collapsed;
        //获取所有的链接（dd）
        var navs = document.querySelectorAll(".navs dd");
        //控制每个具体链接动画
        if($rootScope.collapsed){
            //从左向右走 -100% ---> 0
            for(var i=0;i<navs.length;i++){
                navs[i].style.transform = "translate(0)";
                navs[i].style.transitionDuration = 0.15*(i+1)+"s";
                navs[i].style.transitionDelay = "0.3s";
            }
        }else{
            //从右向左走 0 ---> -100%
            for(var i=navs.length-1;i>=0;i--){
                navs[i].style.transform = "translate(-100%)";
                navs[i].style.transitionDuration = (0.75-0.15*i)+"s";
                navs[i].style.transitionDelay = "0s";
            }
        }
    };
}]);




