'use strict';

; ( function () {
	function tmClockpickerFactory () {
		function strictParse ( twelvehour, string ) {
			var regex, isPm;

			if ( twelvehour ) {
				regex = /^(\d{1,2}):(\d{1,2})\s*(AM|PM)$/i;
			} else {
				regex = /^(\d{1,2}):(\d{1,2})$/;
			}

			var match = string && string.trim().match( regex );

			if ( !match ) {
				return;
			}

			var pm     = match[ 3 ] && match[ 3 ].toUpperCase() === 'PM';
			var hour   = parseInt( match[ 1 ], 10 );
			var minute = parseInt( match[ 2 ], 10 );

			if ( minute > 59 ) {
				return;
			}

			if ( twelvehour ) {
				if ( hour < 1 || hour > 12 ) {
					return;
				}

				if ( pm ) {
					isPm = 12;
				} else {
					isPm = 0;
				}

				hour = hour % 12 + isPm;
			} else if ( hour > 23 ) {
				return;
			}

			return { // eslint-disable-line consistent-return
				'hour'   : hour,
				'minute' : minute
			};
		}

		function parseTime ( string ) {
			if ( !string ) {
				return null;
			}
			return strictParse( true, string );
		}

		return {
			'parseTime' : parseTime
		};
	}

	function tmClockpicker ( tmClockpickerDefaultOptions, tmClockpickerFactory, moment ) { // eslint-disable-line no-shadow
		function link ( scope, element, attr, ngModel ) {
			var options = angular.extend( {}, tmClockpickerDefaultOptions, scope.$eval( attr.tmClockpickerOptions ) );

			var formatTime;

			if ( options.twelvehour ) {
				formatTime = 'hh:mm A';
			} else {
				formatTime = 'HH:mm';
			}

			element.pickatime( options );

			function getModelValue () {
				if ( ngModel.$modelValue ) {
					return ngModel.$modelValue;
				}

				return moment().local().format( formatTime );
			}

			var parseViewValue = tmClockpickerFactory.parseTime;

			scope.$watch( function () {
				return ngModel.$modelValue && ngModel.$modelValue.unix && ngModel.$modelValue.unix();
			}, function () {
				var val = ngModel.$formatters.reduceRight( function ( prev, formatter ) {
					return formatter( prev );
				}, ngModel.$modelValue );

				ngModel.$setViewValue( val );
				ngModel.$render();
			} );

			element.blur( function () {
				if ( ngModel.$valid ) {
					element.val( getModelValue() );
				}
			} );

			ngModel.$render = function render () {
				element.val( ngModel.$viewValue || '' );
			};

			ngModel.$parsers.push( function ( val ) {
				var time = parseViewValue( val );

				ngModel.$setValidity( 'badFormat', Boolean( time ) );

				if ( !time ) {
					return getModelValue();
				}

				return val;
			} );

			ngModel.$formatters.push( function ( momentDate ) {
				var val = parseViewValue( ngModel.$viewValue );

				if ( !momentDate ) {
					return '';
				}

				var localMomentDate = parseViewValue( momentDate );

				var isSameTime = !val || val.hour === localMomentDate.hour && val.minute === localMomentDate.minute;

				if ( element.is( ':focus' ) && isSameTime ) {
					return ngModel.$viewValue;
				}

				return momentDate;
			} );
		}

		return {
			'restrict' : 'A',
			'require'  : 'ngModel',
			'link'     : link
		};
	}

	tmClockpicker.$inject = [ 'tmClockpickerDefaultOptions', 'tmClockpickerFactory', 'moment' ];

	angular.module( 'triton.materialize.clockpicker', [
		'angularMoment'
	] )

	.directive( 'tmClockpicker', tmClockpicker )

	.factory( 'tmClockpickerFactory', tmClockpickerFactory )

	.value( 'tmClockpickerDefaultOptions', {
		'twelvehour' : true,
		'autoclose'  : false,
		'donetext'   : 'ok'
	} );
} )();
