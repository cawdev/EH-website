/* global jQuery */
(function($) {
	'use strict';

	var $document = $(document),
		$window = $(window),
		$navbar = $('.navbar'),
		$behind = $('.behind'),
		genericMobileUA = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)),

		stickyNavFunc = function() {
			$(window).scroll(function() {
				$(document).scrollTop() >= $('#up').height() ? 
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
				elemBottom = elemTop + $(elem).height() - 150;
				// 150 equal to arbritary value, added to allow for element to animate quicker.

			return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
		},
		fadeInFunc = function(element, transition) {
			$(element).each(function() {
				if (isScrolledIntoView($(this)) === true) {
					$(this).addClass(transition);
				}
			});
		},
		enableHTMLVideo = function() {
			if (!genericMobileUA) {
				$behind.append('<video autoplay muted loop playsinline id="skyvideo"><source src="img/sky-quest-clouds.mp4" type="video/mp4"></video>');
			}
		},
		startSlickCarousel = function() {
			// using element container above to init - more fluid
			$('.case-sidebars').each(function() {
				if (isScrolledIntoView($(this)) === true) {
					$('.multiple-items').slick('slickPlay');
				}
			});
		};

	$document.on({
		ready: function() {
			enableHTMLVideo();
			stickyNavFunc();
			smoothScroll();
			slickFunc();
			progressBarFunc();
		}
	});

	$window.on({
		scroll: function() {
			fadeInFunc('.scrolled .fadeUp.animated', 'fadeInUp');
			fadeInFunc('.scrolled .fadeDown.animated', 'fadeInDown');
			fadeInFunc('.scrolled .fadeLeft.animated', 'fadeInLeft');
			startSlickCarousel();
		}
	});
})(jQuery);