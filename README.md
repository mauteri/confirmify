# Confirmify #

Confirmation and Notification Plugin for jQuery -- nicer and more attractive than using `alert()` and `confirm()`!

# Basic Usage #

## For Notifications ##

	$.confirmify({
		message: 'Here is a notification!'	
	});

## For Confirmation ##

	$.confirmify({
		message: 'Are you sure?',
		callback: someFunction
	});

or assign an anonymous function

	$.confirmify({
		message: 'Are you sure?',
		callback: function() { 
			alert('I am sure!'); 
		}
	});

# Configurable Options #

* type **default 'info' - options include 'success', 'warning', 'error', 'danger', 'info')**
* title **default empty**
* message **default empty**
* duration **default 5000 (milliseconds) - set to false for no duration**
* fadeSpeed **default 500**
* close **default true**
* width **default '400px' - options include any width measurement**
* position **default is fixed**
* z_index **default is 9999**
* callback **default is false - option must be a function for a confirmation**

## Coming Soon ##

* keyboard **these will be keyboard bindings and will default to true**
  * enter
  * esc
* cancelFocus **this will set primary button to Cancel rather than OK**

# Version History #

## 0.1 ##
   
* First release. Not fully tested and very much in an alpha state. Currently relies on [Twitter Bootstrap](http://twitter.github.io/bootstrap/) for styling. Started separating out needed styles into a lighter weight stylesheet.
