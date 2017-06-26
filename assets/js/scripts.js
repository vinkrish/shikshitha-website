(function(){

	// Init global DOM elements, functions and arrays
  	window.app 			 				= {el : {}, fn : {}};
	app.el['window']     				= $(window);
	app.el['document']   				= $(document);
    app.el['body']     				    = $('body');
    app.el['back-to-top'] 				= $('.back-to-top');
	app.el['html-body'] 				= $('html,body');
	app.el['animated']   				= $('.animated');
	app.el['loader']        			= $('#loader');
	app.el['mask']          			= $('#mask');
	app.el['header']          			= $('header');
	app.el['navbar-nav'] 				= $('.navbar-nav li.dropdown');

	$(function() {	
	    // Preloader
	    app.el['loader'].delay(700).fadeOut();
	    app.el['mask'].delay(1200).fadeOut("slow");   


		// On hover, open drop down
        app.el['navbar-nav'].on({
	        mouseenter: function() {
                if(app.el['window'].width()>769){
                    $(this).addClass('open');
                }
	        }, mouseleave: function() {
                if(app.el['window'].width()>769){
                    $(this).removeClass('open');
                }
	        }
        });

		// fade in .back-to-top
		app.el['window'].scroll(function () {
			if ($(this).scrollTop() > 500) {
				app.el['back-to-top'].fadeIn();
			} else {
				app.el['back-to-top'].fadeOut();
			}
		});

		// scroll body to 0px on click
		app.el['back-to-top'].click(function () {
			app.el['html-body'].animate({
				scrollTop: 0
			}, 1500);
			return false;
		});

		// Elements animation
		app.el['animated'].appear(function() {
			var element = $(this);
			var animation = element.data('animation');
			var animationDelay = element.data('delay');
			if(animationDelay) {
				setTimeout(function(){
					element.addClass( animation + " visible" );
					element.removeClass('hiding');
				}, animationDelay);
			} else {
				element.addClass( animation + " visible" );
				element.removeClass('hiding');
			}    			
		}, {accY: -150});

        //Hide opened subnav on body click
        app.el['body'].bind('click', function(e) {
            if($(e.target).closest('.navbar').length == 0) {
                var opened = $('.navbar-collapse').hasClass('collapse in');
                if ( opened === true ) {
                    $('.navbar-collapse').collapse('hide');
                }
            }
        });


        //Enable Subnav Parent to be clicked
        if(app.el['window'].width()>769){
            $('.navbar .dropdown > a').click(function(){
                location.href = this.href;
            });
        }


        // Close Subnav on resize
        app.el['window'].resize(function(){
            $(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp();
        });

        var headerContainer = $('#header');
        function fixedHeader(){
            if(app.el['window'].scrollTop() > 0){
                headerContainer.addClass('fixed');
            }else{
                headerContainer.removeClass('fixed');
            }
        }

        fixedHeader();

        app.el['window'].scroll(function(){
            fixedHeader();
        });
        
        function adaptHeaderSpacer() {
            $('#header-spacer').css({
                height : headerContainer.outerHeight()
            })
        }
        adaptHeaderSpacer();


        $(".scroll-to").on("click", function( e ) {
            e.preventDefault();
            $("body, html").animate({
                scrollTop: $( $(this).attr('href') ).offset().top - headerContainer.outerHeight()
            }, 1000);
        });

        $('#header-nav').singlePageNav({
            offset: headerContainer.outerHeight(),
            filter: ':not(.external)',
            currentClass: 'active',
            changeHash: false,
            scrollSpeed: 750,
            scrollThreshold: 0.5,
            easing: 'swing'
        });

        $('.banner-content').matchHeight();

        function adaptBannerImage(){

            var windowWidth = app.el['window'].width();
            var bodyWidth = $('#home').width();
            var bannerImage= $('.banner-image');
            if(windowWidth>991){

                bannerImage.css({
                    width: (bannerImage.outerWidth() + ( (bodyWidth - (2 * bannerImage.outerWidth()))/2 )) - 15
                });
            }else{
                bannerImage.css({
                    width: bodyWidth
                });
            }



        }
        adaptBannerImage();


        app.el['window'].resize(function(){
            fixedHeader();
            adaptHeaderSpacer();
            adaptBannerImage();
        });

        $('.accordion').accordion({
            "transitionSpeed": 400,
            "singleOpen": false
        });

    });

})();