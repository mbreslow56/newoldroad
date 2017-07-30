app.directive("navDirective", ['$state', function(state){
	return {
		templateUrl: 'nav.html',
		link: function(scope, attrs) {
		  scope.showMenu = document.getElementById('home_mobile').offsetParent !== null ? false : true; // if mobile: don't show menu initially
			scope.toggleMenu = function() {
				if (document.getElementById('home_mobile').offsetParent !== null) { // if we're on mobile, activate this function
					scope.showMenu = !scope.showMenu;
				}
			}
			scope.hideMenu = function() {
    		if (document.getElementById('home_mobile').offsetParent !== null) { // if we're on mobile, activate this function
					scope.showMenu = false;
				}
			}

			scope.goHome = function() {
				// $location.url('http://test.com/login.jsp?un');
				console.log("hi");
				state.go('home');
			}
    }
	};
}]);
