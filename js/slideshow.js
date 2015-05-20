(function ($) {
    $.iformat = function( source, params ) {
        if ( arguments.length === 1 ) {
            return function() {
                var args = $.makeArray(arguments);
                args.unshift(source);
                return $.iformat.apply( this, args );
            };
        }
        if ( arguments.length > 2 && params.constructor !== Array  ) {
            params = $.makeArray(arguments).slice(1);
        }
        if ( params.constructor !== Array ) {
            params = [ params ];
        }
        $.each(params, function( i, n ) {
            source = source.replace( new RegExp("\\{" + i + "\\}", "g"), function() {
                return n;
            });
        });
        return source;
    };

    $.slides = $.slides || {}
    $.extend(true, $.slides, {
        setting: {
            delay: 5000,
            duration: 250,
            showDots: true,
            touch: true,
            complete: function(){},
            slides: []
        },
        timerDelay: 50,
        current: 0,
        slideOl: $,
        dots: $,
        autoTimerTrigger: 0,
        timerTrigger: 0,

        slideItem: '<li><a href="{1}">{0}</a></li>',
        dotItem: '<li class="{1}">{0}</li>',

        dotToggle: function (trigger) {
            this.dots.removeClass("active").eq(this.current).addClass("active");
            (trigger || "") == "manual"? this.doDelayMove(): this.doMove();
        },
        doMove: function(){
            $.slides.slideOl.animate({left: "-" + $.slides.current + "00%"}, {
                duration: $.slides.setting.duration,
                complete: $.slides.setting.complete
            });
        },
        doDelayMove: function () {
            clearTimeout($.slides.timerTrigger);
            $.slides.timerTrigger = setTimeout(function () {
                $.slides.doMove();
            }, this.timerDelay);
        },
        next: function () {
            this.current++;
            this.current == this.dots.length && (this.current = 0);
            this.dotToggle();
        },
        auto: function () {
            $.slides.autoTimerTrigger = setInterval(function () {
                $.slides.next();
            }, $.slides.setting.delay);
        }
    });

    $.fn.slideShow = function (params) {
        return this.each(function () {
            if (this.slider) {
                return;
            }
            this.slider = true;
            var setting = $.extend(true, $.slides.setting, params || {});

            var slideCounter = 0;
            var slideItems = "";
            var dotItems = "";
            var firstItem = true;
            $.each(setting.slides, function () {
                slideItems += $.iformat($.slides.slideItem, this.image, this.href);
                dotItems += $.iformat($.slides.dotItem, slideCounter, firstItem?"active":"");
                slideCounter++;
                firstItem = false;
            });
            
	    $(this).append($("<ol>").append($(slideItems))).append($('<ul class="dots">').append($(dotItems)));

            $.slides.slideOl = $(this).find("ol").css({width: slideCounter + "00%"});
            setting.showDots || $(this).find("ul").css({display: "none"});
            $.slides.dots = $(this).find("ul li").on(setting.touch?"mouseenter":"click",function () {
                $.slides.current = parseInt(this.innerHTML);
                $.slides.dotToggle("manual");
            });
            $.slides.dots.length && $(this).hover(function () {
                clearInterval($.slides.autoTimerTrigger);
            }, function () {
                $.slides.auto();
            }) && $.slides.auto();
        });
    }
}(jQuery));