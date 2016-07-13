// Avoid `console` errors in browsers that lack a console.
(function () {
    var method;
    var noop = function () {
    };
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

$(document).ready(function () {

    // gallery background
    function thumbsBg() {
        $('.gallery-photo').each(function () {
            var url = $(this).attr('href');
            var parent = $(this).closest('.gallery-block');
            var img = new Image();
            img.src = url;
            img.style.display = 'none';
            //document.body.appendChild(img);
            parent.css('backgroundImage', 'url(' + url + ')');
        });
    }

    // window.onload = thumbsBg;
    thumbsBg();


// SCROLL TO ANCHOR
    function scrollIfAnchor(href) {
        href = typeof(href) === 'string' ? href : $(this).attr('href');
        var fromTop = 0;
        if (href.indexOf('#') === 0) {
            var $target = $(href);
            if ($target.length) {
                var time = 1000;
                $('html, body').animate({scrollTop: $target.offset().top - fromTop}, time);
                if (history && 'pushState' in history) {
                    history.pushState({}, document.title, window.location.pathname + href);
                    return false;
                }
            }
        }
    }

    $('body').on('click', '.anchor', scrollIfAnchor);


    // CENTERED MODAL
    $(".start-modal").click(function () {
        var d_tar = $(this).attr('data-target');
        $(d_tar).show();
        var modal_he = $(d_tar).find('.modal-dialog .modal-content').height();
        var win_height = $(window).height();
        var marr = win_height - modal_he;
        $('.modal-dialog').css('margin-top', marr / 2);
    });

    /*
     // MAIL FORM
     $("form").submit(function () {
     var formID = $(this).attr("id");
     $.ajax({
     type: "POST",
     url: "mail.php", // mail script
     data: $(this).serialize()
     }).done(function () {
     $(this).find("input").val("");
     $('#' + formID).trigger("reset");
     $('#callbackModal').modal('show');
     });
     var parent = $(this).parents('.modal');
     var modalID = parent.attr("id");

     if ($('#' + modalID).hasClass('in')) {
     $('#' + modalID).modal('hide');
     return false;
     } else {
     return false;
     }
     });
     */


    //Scroll MONITOR
    $('.s-monitor').each(function (i, element) {

        if ($(element).get(0).hasAttribute("data-bottom")) {
            var offsetBottom = $(this).data('bottom');
        }
        else {
            var offsetBottom = 100
        }
        if ($(element).get(0).hasAttribute("data-top")) {
            var offsetTop = $(this).data('top')
        }
        else {
            var offsetTop = 100
        }
        var watcher = scrollMonitor.create(element, {top: offsetTop, bottom: offsetBottom});
        var action = $(this).data('animated');
        var delay = $(this).data('delay');

        watcher.enterViewport(function () {
            //console.log(this + ' ' + action + ' ' + 'I have entered the viewport');
            if ($(element).get(0).hasAttribute("data-delay")) {
                $(element).css('animation-delay', delay + 's')
            }
            if ($(element).get(0).hasAttribute('data-value')) {
                /*  runDigitFlow();  // RUN DIGIT FLOW .lost-count*/
            }
            $(element).addClass(action);
            watcher.destroy
        });
        watcher.exitViewport(function () {
            // console.log(this + ' ' + action + ' ' + 'I have left the viewport');
            $(element).removeClass(action);
            watcher.destroy
        });
    });
    function repeatTicker() {
        var list = $('.flower-transition li');
        var pause = 9000;
        var count = $(list).length;
        list.each(function (i) {
            $(this).delay(i * pause).animate({
                left: "-100%",
                opacity: "1"
            }, "slow").delay(pause - 3000).animate({left: "0%", opacity: "0"}, "fast");
        });
        setTimeout(repeatTicker, pause * count);
    }

    window.onload = function () {
        setTimeout(function () {
            repeatTicker();
        }, 5000);
    };

    jQuery(function ($) {
        $('input[name=phone]').mask("+(380) (99) 999-99-99");
    });

    $('.send-form').click(function () {
        var formID = ('#' + this.form.id);
        $(formID).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 3,
                    maxlength: 16
                },
                comment: {
                    required: true
                },

                phone: {
                    //number: true,
                    required: true
                    //minlength: 21,
                    //maxlength: 21
                }
            },
            messages: {

                name: {
                    required: "Это поле обязательно для заполнения",
                    minlength: "Должно быть минимум 3 символа",
                    maxlength: "Максимальное число символов - 16"
                },

                phone: {
                    //matches: "/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/",
                    required: "Это поле обязательно для заполнения"
                    //minlength: "Номер должен быть минимум 20 символа",
                    //maxlength: "Номер должен быть максимум 22 символов"
                    //number: "Введите номер телефона"
                },

                comment: {
                    required: "Это поле обязательно для заполнения"
                }

            },

            submitHandler: function (form) {
                var request;
                var serializedData;
                var inputs;
                var callbackModalID;

                serializedData = $(form).serialize();
                inputs = $(formID).find('input, select, button, textarea');
                callbackModalID = '#callbackModal';

                request = $.ajax({
                    url: "mail.php",
                    type: "post",
                    data: serializedData
                });
                request.done(function () {
                    $(formID).trigger("reset");
                    $(callbackModalID).modal('show');
                    var parent = $(formID).closest('.modal');
                    var modalID = ('#' + parent.attr("id"));
                    if ($(modalID).hasClass('in')) {
                        $(modalID).modal('hide');
                        return false;
                    } else {
                        return false;
                    }
                });

                request.fail(function (jqXHR, textStatus, errorThrown) {
                    console.error(
                        "The following error occured: " + textStatus, errorThrown);
                });

                request.always(function () {
                    inputs.prop("disabled", true);
                });
            }
        });
    });

    // prod card effects
    var hoverOrClick = function () {
        var hElement = $(this).find('.hovered');

        if ($(hElement).css('display') == 'none') {
            hElement.fadeIn();
        }
        else {
            hElement.fadeOut();
        }
    };
    $('.card-photo').click(hoverOrClick).hover(hoverOrClick);
});

