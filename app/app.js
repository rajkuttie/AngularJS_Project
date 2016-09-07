var myApp=angular.module("myApp",['ngRoute','ngAnimate','ngMessages','ngMask','wiz.validation']);
//Routing
myApp.config(function($routeProvider) {

	$routeProvider
	.when("/",{
		templateUrl:'template/home.html'
		
	})
	.when("/About",{
		templateUrl:'template/about.html'
		
	})
	.when("/Form",{
		templateUrl:'template/form.html'
		
	})
	.when("/Angular_fire",{
		templateUrl:'template/Angular_fire.html'
		
	})
	.when("/Directive",{
		templateUrl:'template/Directive.html'
		
	})

	.when("/Blog",{
		templateUrl:'template/Blog.html'
		
	})

//Dynamic Routing
	.when('/Blog/:id',{
		templateUrl:'template/dynamic_pages.html'
		})

//After submit comes Thank u page

	.when("/ThankYou",{
		templateUrl:'template/ThankYou.html'
		
	})
		.when("/Plural",{
		templateUrl:'template/Plural.html'
		
	})
		.when("/ng-switch",{
		templateUrl:'template/ng-switch.html'
		
	})
		.when("/mouse-event",{
		templateUrl:'template/mouse-event.html'	
	})
		.when("/ToDo",{
		templateUrl:'template/ToDo.html'
		
	})
		.when("/css-train",{
		templateUrl:'template/css-train.html'
		
	})
		.when("/interval&Timeout",{
		templateUrl:'template/interval&Timeout.html'
		
	})
	
	
	.otherwise({
		templateUrl:'template/home.html'

	});
	
});

//Firebase Database Connection

myApp.controller('Angular_Fire',['$scope',function($scope){

	$scope.myData=new Firebase("https://amber-torch-6920.firebaseio.com")

	$scope.save_details=function(){
		$scope.myData.push({Name:$scope.Name,age:$scope.age});
		
	};
	$scope.myData.on('value',function(snapshot){
		$scope.Details=snapshot.val();
	});

	//$scope.remove_Details=function(value){
		//alert(value);
	//scope.myData.splice(value,1);
		
	//};

}]);

//After submit comes Thank u page

myApp.controller('form_controller',['$scope','$location', function($scope,$location){
$scope.form_details=function(){
	$location.path('/ThankYou');
};


}]);


//Directive Passing values dynamic tags

myApp.directive('heading',function(){
	return{
			restrict:"EA",
			template: function(element,atribute){
				return " <img src='img/"+atribute.dif+".jpg'height="+atribute.height+" width="+atribute.width+"/> ";
						}  
		 }
	}
);



myApp.directive("item", function() {
    return {
        restrict: 'E',
        scope: {},
        link: function(scope, element, attrs) {
            scope.name = attrs.name;
        },
        template: '<div><strong>Name:</strong> {{name}} <strong>Select Amount:</strong> <select name="count" ng-model="count"><option value="1">1</option><option value="2">2</option></select> <strong>Selected Amount:</strong> {{count}}</div>'
    }
});





//Alert msg comes not finishing form filed Reload and navigate to one page to another page

myApp.directive('reconsider', function() {
        return {
            link: function($scope, elem, attrs) {

                window.onbeforeunload = function(){
                    if ($scope.frm.$dirty) {
                        return "you are not yet finished this";
                    }
                }

                
                $scope.$on('$locationChangeStart', function(event, next, current) {
                    if ($scope.frm.$dirty && $scope.frm.$invalid) {
                        if(!confirm("you are not yet finished this")) {
                            event.preventDefault();
                        }
                    }
                });
            }
        };
    });

myApp.controller("MessageCtrl", function($scope) {
    $scope.message = "Product created!";

    $scope.likeFunction = function() {
    alert("I like the book!");
};

 $scope.unlikeFunction = function() {
    alert("I don't like the book!");
};




});
myApp.directive("notification", function() {
    return {
        restrict: 'E',
        scope: {
            message: '@'
        },
        template: '<h1> <div class="alert">{{message}}</div> </h>'
    }
});

myApp.directive("bookComment", function() {
    return {
        restrict: 'E',
        scope: {
            passingKey: '='
        },
        template: '<input type="text" ng-model="passingKey"/>'
    }
})

myApp.directive("likeBook", function() {
    return {
        restrict: 'E',
        scope: {
            like: '&'
        },
        template: '<input type="button" ng-click="like()" value="Like"/>'
    }
});










//blog page post view Fetching data and passing to view

myApp.controller('blog_controller',['$scope','$http', function($scope,$http){
	$http.get("data.json").success(function(response){
		$scope.blogs=response;
	});
	
}]);


//Dynamic Blog controller Getting blog id and give dynamic page

myApp.controller('Dynamic_page_controller',['$scope','$http','$routeParams',function($scope,$http,$routeParams){

$http.get('data.json').success(function(data){

			$scope.Dynamic_blog=data[$routeParams.id];
	});	


}]);

//Creating a TODo

myApp.controller('ToDoController',['$scope',function($scope){



	
	$scope.todos=[

				{ 'title':'This is rajkumar',
				  'done' :false
				}
	];

	$scope.addTodo=function(){
		$scope.todos.push(
		{
			'title':$scope.newTodo,
			'done':false
		});
		$scope.done="";

	};


	$scope.clearCompleted=function(){
		$scope.todos=$scope.todos.filter(function(item){
			return !item.done
		})

	};




//Voic command 
	var commands={
		'new item *val' : function(val){
			$scope.newTodo=val;
			$scope.addTodo();
			$scope.$apply();
		},

		'check number *val' :function(val){
			$scope.todos[parseInt(val)-1].done=true;
			$scope.$apply();
		},
		'remove number *val':function(val){
			$scope.todos.splice(parseInt(val)-1,1)
			$scope.$apply();
		},

		'clear Completed':function(){
			$scope.clearCompleted();
			$scope.$apply();
		},

	}
	annyang.addCommands(commands);
	annyang.debug();
	annyang.start();

}]);

//interval functionality

myApp.controller('IntervalController',['$scope','$interval',function($scope,$interval){
	$scope.items=[];
	var i=0;
	var promise	=$interval(function(){
		$scope.items.push(i++);
	},500);

	$scope.stop=function(){
		$interval.cancel(promise)
	}


}]);

//timeout functionality

myApp.directive('countdown', [
        'Util',
        '$interval',
        function (Util, $interval) {
            return {
                restrict: 'A',
                scope: { date: '@' },
                link: function (scope, element) {
                    var future;
                    future = new Date(scope.date);
                    $interval(function () {
                        var diff;
                        diff = Math.floor((future.getTime() - getTime()) / 1000);
                        return element.text(Util.dhms(diff));
                    }, 1000);
                }
            };
        }
    ]);
myApp.factory('Util', [function () {
            return {
                dhms: function (t) {
                    var minutes, seconds;
                    
                    minutes = Math.floor(t / 60) % 60;
                    t -= minutes * 60;
                    seconds = t % 60;
                    return [
                       
                        minutes + 'm',
                        seconds + 's'
                    ].join(' ');
                }
            };
        }]);
