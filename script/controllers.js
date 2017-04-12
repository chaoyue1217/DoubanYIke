/**
 *  控制器
 */
angular.module("Ctrls",[])
.controller("navsCtrl",["$scope",function ($scope) {
    $scope.navs = [
        {text:"今日一刻",icon:"icon-home",link:"#!/today"},
        {text:"往期内容",icon:"icon-file-empty",link:"#!/older"},
        {text:"热门作者",icon:"icon-pencil",link:"#!/author"},
        {text:"栏目浏览",icon:"icon-menu",link:"#!/category"},
        {text:"设置",icon:"icon-cog",link:"#!/settings"}
    ];
}])
//今日一刻
.controller("todayCtrl",["$scope","$http","$rootScope",function ($scope,$http,$rootScope) {
    $rootScope.loaded = false;
    $rootScope.title = "今日一刻";
    $rootScope.key = 0;

    $http({
        url:"./api/url.php",
        params:{
            flag:1,
            url:"https://moment.douban.com/api/stream/date/2016-08-20?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&format=full&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6"
        }
    }).then(function (res) {
        $scope.date = res.data.date;
        $scope.posts = res.data.posts;
        $rootScope.loaded = true;
    });
}])
.controller("olderCtrl",["$scope","$http","$rootScope",function ($scope,$http,$rootScope) {
    $rootScope.loaded = false;
    $rootScope.title = "往期内容";
    $rootScope.key = 1;
    var day = -2;
    $http({
        url:"./api/url.php",
        params:{
            flag:2,
            day: day,
            url:"https://moment.douban.com/api/stream/date/2016-08-20?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&format=full&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6"
        }
    }).then(function (res) {
        $scope.posts = res.data.posts;
        $scope.date = res.data.date;
        $rootScope.loaded = true;
    })
}])
.controller("authorCtrl",["$scope","$http","$rootScope",function ($scope,$http,$rootScope) {
    $rootScope.loaded = false;
    $rootScope.title = "热门作者";
    $rootScope.key = 2;
    $http({
        url:"./api/url.php",
        params:{
            recUrl:"https://moment.douban.com/api/auth_authors/rec?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6",
            allUrl:"https://moment.douban.com/api/auth_authors/all?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=10&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6",
            flag:3
        }
    }).then(function (res) {
        $scope.rec = res.data.rec.authors;
        $scope.all = res.data.all.authors;
        $rootScope.loaded = true;
    });

}]).controller("cateCtrl",["$scope","$http","$rootScope",function ($scope,$http,$rootScope) {
    $rootScope.loaded = false;
    $rootScope.title = "栏目浏览";
    $rootScope.key = 3;
    $http({
        url:"./api/url.php",
        params:{
            url:"https://moment.douban.com/api/columns?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6",
            flag:4
        }
    }).then(function (res) {
        $scope.columns = res.data.columns;
        $rootScope.loaded = true;
    });
}]).controller("setCtrl",["$scope","$http","$rootScope",function ($scope,$http,$rootScope) {
    $rootScope.loaded = true;
    $rootScope.key = 4;
}]);