/* global jQuery */
(function($) {
	'use strict';

	var $document = $(document),
		$window = $(window),
		distanceFromTop = $(document).scrollTop(),
		$navbar = $('.navbar'),
		$skyVideo = $('video#skyvideo'),
		genericMobileUA = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)),

		stickyNavFunc = function() {
			$(window).scroll(function() {
				distanceFromTop >= $('#up').height() ? 
				$navbar.fadeIn(400)
					   .addClass('animated slideInDown fixed') :
				$navbar.removeClass('slideInDown')
					   .addClass('fadeOutUp')
					   .fadeOut(300)
					   .removeClass('fixed');
			});
		},
		smoothScroll = function() {
			var scroll = new SmoothScroll('a[href*="#"]', {
				speed: 1800,
				easing: 'easeInOutCubic'
			});
		},
		slickFunc = function () {
			var $multipleItems = $('.multiple-items'),
				slickOptions = {
					infinite: true,
					slidesToShow: 2,
					dots: true,
					arrows: false,
					mobileFirst: true,
					focusOnSelect: true,
					variableWidth: true,
					autoplay: true,
					autoplaySpeed: 5000,
					cssEase: 'cubic-bezier(0.86, 0, 0.07, 1)',
					useTransform: true,
					speed: 1000,
					lazyLoad: 'ondemand'
				}
			$multipleItems.slick(slickOptions);
		},
		progressBarFunc = function () {
			var winHeight = $(window).height(), 
				docHeight = $(document).height(),
				progressBar = $('progress'),
				max, value;

			max = docHeight - winHeight;
			progressBar.attr('max', max);

			$(document).on('scroll', function(){
				value = $(window).scrollTop();
				progressBar.attr('value', value);
			});
		},
		isScrolledIntoView = function(elem) {
			var docViewTop = $(window).scrollTop(),
				docViewBottom = docViewTop + $(window).height(),
				elemTop = $(elem).offset().top,
				elemBottom = elemTop + $(elem).height();

			return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
		},
		fadeInFunc = function (element, transition) {
			$(element).each(function() {
				if (isScrolledIntoView($(this)) === true) {
					$(this).addClass(transition);
				}
			});
		},
		initSkyQuest = function() {
			!genericMobileUA ? $skyVideo.attr('preload', 'auto') : $skyVideo.removeAttr('autoplay muted loop playsinline');
		};

	$document.on({
		ready: function() {
			stickyNavFunc();
			smoothScroll();
			slickFunc();
			progressBarFunc();
			initSkyQuest();
		}
	});

	$window.on({
		scroll: function() {
			fadeInFunc('.scrolled .fadeUp.animated', 'fadeInUp');
			fadeInFunc('.scrolled .fadeDown.animated', 'fadeInDown');
			fadeInFunc('.scrolled .fadeLeft.animated', 'fadeInLeft');
		}
	});
})(jQuery);