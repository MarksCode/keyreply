var KeyReply = {}

KeyReply.run = function(team, username, password) {
    var login = {
        tenancyName: team,
        usernameOrEmailAddress: username,
        password: password
    }

    var content = {
        categoryList: [{
            title: "Landing Page",
            description: "Good content for Landing page"
        }],
        replyList: [{
            title: "Welcome",
            content: "Welcome to KeyReply, enjoy your stay here!",
            category: "Landing Page"
        }, {
            title: "Good bye",
            content: "See you later!",
            category: "Landing Page"
        }]
    }
    
    KeyReply.Authenticate(login).success(function() {
        if (KeyReply.token) {
            KeyReply.loadContent(content)
        }
    })
}

KeyReply.loadContent = function(data) {
    return $.ajax({
        type: "POST",
        url: "https://app.keyreply.com/api/services/app/content/loadContent",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        headers: {
            "Authorization": "Bearer " + KeyReply.token
        },
        dataType: "json",
        success: function(response) {
            if (response.success == true) {
                console.log("%c success! Loading Content", "color: #007700");
            }
        },
        failure: function(errMsg) {
            console.log("%c Login Failed " + errMsg, "color: #770000")
        }
    });
}

KeyReply.Authenticate = function(login) {
    if (login.tenancyName && login.usernameOrEmailAddress && login.password) {
        return $.ajax({
            type: "POST",
            url: "https://app.keyreply.com/api/Account/Authenticate",
            data: JSON.stringify(login),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(response) {
                if (response.success == true) {
                    console.log("success");
                    KeyReply.token = response.result
                } else {
                    console.log(response.error)
                }
            },
            failure: function(errMsg) {
                console.log("Login Failed")
            }
        });
    } else {
        console.log("Login information is incomplete");
    }
}

(function($) {
    "use strict";

    //Load page
    $(window).on('load', function() {
        $('#overflow').removeClass('overflow');
        $('.loader').css('display', 'none');
    });

    //Animation
    $(window).on('scroll', function() {

        if ($(window).width() > 990) {

            $('.animate-top').each(function() {
                var elmentPosition = $(this).offset().top;
                var topOfWindow = $(window).scrollTop();
                if (topOfWindow + $(window).height() > elmentPosition) {
                    $(this).addClass("slideUp");
                }
            });

            $('.animate-left').each(function() {
                var elmentPosition = $(this).offset().top;
                var topOfWindow = $(window).scrollTop();
                if (topOfWindow + $(window).height() > elmentPosition) {
                    $(this).addClass("fadeInLeft");
                }
            });

            $('.animate-right').each(function() {
                var elmentPosition = $(this).offset().top;
                var topOfWindow = $(window).scrollTop();
                if (topOfWindow + $(window).height() > elmentPosition) {
                    $(this).addClass("fadeInRight");
                }
            });

            $('.bounce-in').each(function() {
                var elmentPosition = $(this).offset().top;
                var topOfWindow = $(window).scrollTop();
                if (topOfWindow + $(window).height() > elmentPosition) {
                    $(this).addClass("po-bounce-in");
                }
            });


            $('.animate-fade').each(function() {
                var elmentPosition = $(this).offset().top;
                var topOfWindow = $(window).scrollTop();
                if (topOfWindow + $(window).height() > elmentPosition) {
                    $(this).addClass("fade-in");
                }
            });


        } else {
            $(' .animate-fade, .animate-top, .animate-right, .animate-left, .bounce-in').css('visibility', 'visible');

        }

    });


    function animateHeader() {
        if ($(window).width() > 990) {
            $('.bounce-in-h').addClass('po-bounce-in');
        } else {
            $('.bounce-in-h').css('visibility', 'visible');

        }
    }

    animateHeader();


    //  FIXED BACKGROUND
    function slide_bg() {
        $('.slide-img').each(function() {
            var bgSrc = $(this).attr('src');
            $(this).parent().css({
                'background-image': 'url(' + bgSrc + ')'
            });
            $(this).remove();
        });
    }
    slide_bg();


    function center_bg() {
        $('.center-image').each(function() {
            var bgSrc = $(this).attr('src');
            $(this).parent().css({
                'background-image': 'url(' + bgSrc + ')'
            });
            $(this).remove();
        });
    }
    center_bg();


    //PLAY VIDEO
    $('.play').click(function(e) {
        e.preventDefault();
        var srcVideo = $(this).data('src');
        setTimeout(function() {
            $('.close-video').addClass('close-video-active');
        }, 500);
        $('.video').addClass('video-active').attr("src", srcVideo);
    });


    $('.close-video').on('click', function() {
        $(this).removeClass('close-video-active');
        $('.video').removeClass('video-active').attr("src", ' ');
    });


    //CUSTOM UPLOAD
    $('.custom-file-input').on('change', function() {
        var realVal = $(this).val(),
            lastIndex = realVal.lastIndexOf('\\') + 1;
        if (lastIndex !== -1) {
            realVal = realVal.substr(lastIndex);
            $(this).prev('.mask').find('.fileInputText').val(realVal);
            $('.delete-photo').show();
        }
    });

    $('.delete-photo').on('click', function(e) {
        e.preventDefault();
        var $wrapper = $(this).parents(".mask-wrapper");
        $wrapper.find(".fileInputText").val("");
        $wrapper.find(".custom-file-input").val("");
        $('.delete-photo').hide();
    });


    $('#my_file').on({
        mouseenter: function() {
            $('.send-file').addClass('file-input-h');
        },
        mouseleave: function() {
            $('.send-file').removeClass('file-input-h');
        }
    });


    //MENU
    $('.menu-button').on('click', function() {
        var overlay = $('.overlay-nav');
        $(this).toggleClass('active');
        $('.nav').toggleClass('nav-mobile');
        overlay.toggleClass('overlay-nav-active');
        overlay.addClass('overlay-fix');

        if (!overlay.hasClass('overlay-nav-active')) {
            setTimeout(function() {
                overlay.removeClass('overlay-fix');
            }, 1000);
        }

    });


    //SLIDE TO
    $('#start').on('click', function(e) {
        $('html,body').stop().animate({
            scrollTop: $('.start-block').offset().top
        }, 800);
        e.preventDefault();
    });


    //CLOSE MESSAGE
    $('.close-m').on('click', function(e) {
        e.preventDefault();
        $(this).parent('.message-box').fadeOut(500);
    });

    // ======
    // SWIPER
    // ======

    //Home page slider
    if ($('.slider-home').length) {
        var mySwiper = new Swiper('.slider-home', {
            pagination: '.pagination-home',
            grabCursor: true,
            paginationClickable: true,
            onSlideChangeStart: function() {
                $('.slider-menu-item').removeClass('active');
                $('.slider-menu-item').eq(mySwiper.activeIndex).addClass('active');
            }
        });


        $('.slider-menu-item').click(function(e) {
            e.preventDefault();
            var eqIndex = $('.slider-menu-item').index(this);
            $('.slider-menu-item').removeClass('active');
            $(this).addClass('active');
            mySwiper.slideTo(eqIndex);
            mySwiper.stopAutoplay();
            return false;
        });
    };



    //Customer slider
    if ($('.customer-slider').length) {
        var customerSlider = new Swiper('.customer-slider', {
            pagination: '.pagination-customer',
            loop: true,
            grabCursor: true,
            paginationClickable: true,
            prevButton: '.arrow-left-cus',
            nextButton: '.arrow-right-cus'
        });
    };

    //Screen slider
    if ($('.screen-slider').length) {
        var screenSlider = new Swiper('.screen-slider', {
            pagination: '.pagination-screen',
            paginationClickable: true,
            slidesPerView: 4,
            calculateHeight: true,
        });

        $(window).resize(function() {
            var ww = $(window).width();
            if (ww < 790) {
                screenSlider.params.slidesPerView = 1;
            } else {
                screenSlider.params.slidesPerView = 4;
            }
            screenSlider.init();

        });
        $(window).trigger('resize');
    };



    //Tour slider
    if ($('.tour-slider').length) {
        var tourSlider = new Swiper('.tour-slider', {
            pagination: false,
            loop: true,
            grabCursor: true,
            paginationClickable: true,
            nextButton: '.arrow-left',
            prevButton: '.arrow-right'
        });
    };

    //Post slider
    if ($('.post-carousel').length) {
        var postCarousel = new Swiper('.post-carousel', {
            pagination: '.pagination-post',
            paginationClickable: true,
            slidesPerView: 3,
            loop: true
        });
        $(window).resize(function() {
            var ww = $(window).width();
            if (ww < 601) {
                postCarousel.params.slidesPerView = 1;
            } else {
                postCarousel.params.slidesPerView = 3;
            }
            postCarousel.init();

        });
        $(window).trigger('resize');
    };

    //Video slider
    if ($('.video-slider').length) {
        var videoSlider = new Swiper('.video-slider', {
            pagination: '.pagination-video',
            loop: true,
            grabCursor: true,
            paginationClickable: true,
            preventClicks: false,
            preventClicksPropagation: false,
            slideToClickedSlide: true

        });

        $('.sl-play').on('click', function(e) {
            e.preventDefault();
            var $this = $(this),
                videoSlide = $('.video-sl'),
                srcVideo = $this.data('src');
            setTimeout(function() {
                $('#close-video').addClass('close-video-active');
            }, 500);
            videoSlide.addClass('video-active').attr("src", srcVideo);
            $('.pagination-video').addClass('zindex');
        });

        $('#close-video').on('click', function() {
            $('#close-video').removeClass('close-video-active');
            $('.video-sl').removeClass('video-active').attr("src", ' ');
            $('.pagination-video').removeClass('zindex');
        });
    };



    if ($('.widget-slider').length) {
        var widgetSlider = new Swiper('.widget-slider', {
            pagination: false,
            loop: true,
            grabCursor: true,
            paginationClickable: true,
            nextButton: '.arrow-left-sm',
            prevButton: '.arrow-right-sm'
        });
    };

    if ($('.widget-testimonials').length) {
        var widgetTestimonials = new Swiper('.widget-testimonials', {
            pagination: '.pagination-st',
            loop: true,
            grabCursor: true,
            paginationClickable: true

        });
    };


    //Vertical Slider
    if ($('.bxslider').length) {
        if ($(window).width() > 767) {
            $('.bxslider').bxSlider({
                mode: 'vertical',
                controls: false

            });
        } else {

            $('.bxslider').bxSlider({
                mode: 'horizontal',
                controls: false
            });
        }
    };


    if ($('.payment-slider').length) {
        var swiperPayment = new Swiper('.payment-slider', {
            pagination: '.payment-pagination',
            paginationClickable: true
        });
    };
})(jQuery);
