/**
 * jquery.confirmify.js v0.2
 *
 * @author mauteri <mauteri@gmail.com>
 * 
 */
(function( $ ) {

	$.confirmify = function( options ) {
		var $self = $.confirmify;

		$self.queue = typeof $self.queue === 'undefined' ? [] : $self.queue;
		
		var defaults = {
			type: 'info',
			title: '',
			message: '',
			keyboard: {
				enter: true,
				esc: true
			},
			duration: 5000,
			fadeSpeed: 500,
			close: true,
			width: '400px',
			cancelFocus: false,
			z_index: 9999,
			callback: false
		};

		// Configure settings
		if( typeof $self.defaults !== 'undefined' ) {
			defaults = $.extend( settings, defaults, $self.defaults );	
		}
		var settings = $.extend( settings, defaults, options );
		
		var html = $('<div />');
		html.addClass('confirmify');
		html.animate({ opacity: 0 }, 0);
		html.width(settings.width);
		html.addClass('alert');
		
		// Make sure if callback is set that it's a function
		if( settings.callback && typeof settings.callback !== 'function' ) {
			settings.callback = false;
		}

		// Check if close X should appear. If there's a callback, an X will not appear
		if( ( settings.close || !settings.duration ) && !settings.callback ) {
			html.prepend('<button type="button" class="close confirmify-cancel" data-dismiss="alert">&times;</button>');
		} else {
			html.css({ 'padding': '10px' });
		}

		switch(settings.type) {
			case 'success':
				html.addClass('alert-success');
				break;
			case 'warning':
				html.addClass('alert-warning');
				break;
			case 'error':
				html.addClass('alert-error');
				break;
			case 'danger':
				html.addClass('alert-danger');
				break;
			case 'info':
				html.addClass('alert-info');
				break;
			default:
				html.addClass('alert-info');
		}
		if( settings.title !== '' ) {
			html.append('<h4>'+settings.title+'</h4>');
		}
		html.append('<p>'+settings.message+'</p>');
	
		// If callback is NOT a function, it will be false and this will not run
		if( settings.callback ) {
			html.append('<div class="confirmify-btns pull-right" />');
			html.find('.confirmify-btns').append('<button class="confirmify-cancel btn btn-small">Cancel</button>&nbsp;');
			html.find('.confirmify-btns').append('<button class="confirmify-ok btn btn-primary btn-small">OK</button>');
		}

		// Add html to settings object and then add object to queue array
		settings.html = html;
		$self.queue.push(settings);

		// If $self.runQueue is undefined, that means there is only one item in the queue
		if( typeof $self.runQueue === 'undefined' ) {
			$self.runQueue = function(current) {
				$(document.body).prepend(current.html);
				current.html
					.css({ 
						'top': '-'+parseInt(current.html.height(), 10)+'px', 
						'margin-left': '-'+parseInt(current.html.outerWidth(), 10)/2+'px',
						'left': '50%',
						'position': 'fixed',
						'z-index': current.z_index
					})
					.animate({ 'opacity': 1, 'top': '10px' }, current.fadeSpeed);
			
				// Remove item that just ran from queue
				$self.queue.splice(0, 1);
				
				// Check if notification (no callback) or confirmation (callback)
				if( !current.callback && current.duration ) {
					var delay = setTimeout( function() { queueFinish(current); }, current.duration );
				} else {
					current.html.on('click', '.confirmify-ok', function() {
						current.callback();
						queueFinish(current);
					});
				}
				
				current.html.on('click', '.confirmify-cancel', function(e) {
					e.stopPropagation();
					if( typeof delay !== 'undefined' ) {
						clearTimeout(delay);
					}
					queueFinish(current);
				});

			};
			$self.runQueue($self.queue[0]);
		}
		
		// Internal Methods
		function queueFinish(current) {
			current.html.fadeOut(current.fadeSpeed, 'linear', function() { 
				current.html.remove();
				
				// Check queue if $self.runQueue should run again, if not, set it as undefined so another can run at any time
				if( typeof $self.queue[0] !== 'undefined' ) {
					$self.runQueue($self.queue[0]);
				} else {
					$self.runQueue = undefined;
				}
			});
		}
		
	};

}( jQuery ));
