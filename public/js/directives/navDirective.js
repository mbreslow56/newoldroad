app.directive("navDirective", function(){
	return {
		templateUrl: 'nav.html',
		link: function(scope) {
      scope.showMenu = true;
			scope.toggleMenu = function() {
				scope.showMenu = !scope.showMenu;
			}
			scope.hideMenu = function() {
    		if (document.getElementById('home_mobile').offsetParent !== null) { // if we're on mobile, activate this function
					scope.showMenu = false;
				}
			}
    }
	};
});
