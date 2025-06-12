(function($){

	/* ---------------------------------------------- /*
	 * Preloader
	/* ---------------------------------------------- */
	$(window).on('load', function() {
		$('#status').fadeOut();
		$('#preloader').delay(300).fadeOut('slow');
	});

	$(document).ready(function() {

		// Smooth scroll
		$('a[href*=#]').bind("click", function(e){
			var anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $(anchor.attr('href')).offset().top
			}, 1000);
			e.preventDefault();
		});

		// Scroll-up button
		$(window).scroll(function() {
			if ($(this).scrollTop() > 100) {
				$('.scroll-up').fadeIn();
			} else {
				$('.scroll-up').fadeOut();
			}
		});

		// Sticky navbar
		$('.header').sticky({
			topSpacing: 0
		});

		$('body').scrollspy({
			target: '.navbar-custom',
			offset: 70
		});

		// Skills chart
		$('.skills').waypoint(function(){
			$('.chart').each(function(){
				$(this).easyPieChart({
					size:140,
					animate: 2000,
					lineCap:'butt',
					scaleColor: false,
					barColor: '#FF5252',
					trackColor: 'transparent',
					lineWidth: 10
				});
			});
		},{offset:'80%'});

		// ✅ Quote Rotator com tempo ajustado
		if (typeof $.fn.cbpQTRotator !== 'undefined') {
			$('#cbp-qtrotator').cbpQTRotator({
				speed: 1000,     // transição suave
				interval: 12000  // 12 segundos visível
			});
		}

		// Home background
		$(".screen-height").height($(window).height());
		$(window).resize(function(){
			$(".screen-height").height($(window).height());
		});

		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
			$('#home').css({'background-attachment': 'scroll'});
		} else {
			$('#home').parallax('50%', 0.1);
		}

		// WOW animation
		wow = new WOW({ mobile: false });
		wow.init();

		// Email validation
		function isValidEmailAddress(emailAddress) {
			var pattern = new RegExp(/^...$/i); // (encurtado por brevidade)
			return pattern.test(emailAddress);
		}

		// Contact form
		$('#contact-form').submit(function(e) {
			e.preventDefault();

			var c_name = $('#c_name').val();
			var c_email = $('#c_email').val();
			var c_message = $('#c_message').val();
			var response = $('#contact-form .ajax-response');

			var formData = {
				'name': c_name,
				'email': c_email,
				'message': c_message
			};

			if ((c_name === '' || c_email === '' || c_message === '') || (!isValidEmailAddress(c_email))) {
				response.fadeIn(500);
				response.html('<i class="fa fa-warning"></i> Por favor, preencha corretamente.');
			} else {
				$.ajax({
					type: 'POST',
					url: 'assets/php/contact.php',
					data: formData,
					dataType: 'json',
					encode: true,
					success: function(res){
						var ret = $.parseJSON(JSON.stringify(res));
						response.html(ret.message).fadeIn(500);
					}
				});
			}

			return false;
		});

	});

})(jQuery);
