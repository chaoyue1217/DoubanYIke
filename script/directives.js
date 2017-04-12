/**
 * Created by Administrator on 2017/3/29.
 */
angular.module('Directives',[])
.directive('yikeLoading',function () {
    return {
        restrict:'A',
        template:'<img class="loading"ng-hide="loaded"src="./public/images/loading.gif"alt=""/>'
    } 
});