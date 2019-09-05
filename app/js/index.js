$(document).ready(function () {
    let button = $('.js-show-popup'),
        popup = $('.b-popup'),
        popupSend = $('.b-popup--send'),
        popupThanks = $('.b-popup--thanks'),
        popupCard = $('.b-popup--card'),
        html = $('html'),
        activeClass = 'b-popup--active',
        up = $('.b-up'),
        close = $('.js-close-popup'),
        form = $('.js-send-form');

    /** Popup **/
    function showPopup(popup) {
        popup.addClass(activeClass);
        html.addClass('oHidden');
    }

    function closePopup() {
        popup.removeClass(activeClass);
        html.removeClass('oHidden');
    }

    button.on('click', function (e) {
        showPopup(popupSend);
    });
    close.on('click', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        closePopup();
    });

    /** Masked Input **/
    $('input[name=phone]').mask('+38(099) 999 99 99');

    /** Anchor link **/
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function (event) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function () {
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    }
                });
            }
        }
    });
    $(window).scroll(function (e) {
        if (window.pageYOffset >= 220) {
            up.addClass('b-up--active');
        } else up.removeClass('b-up--active');
    });

    /** Send Form **/
    form.on('submit', function (e) {
        let form = $(this);
        e.preventDefault();
        e.stopImmediatePropagation();

        let data = {
            name: form.find('input[name=name]').val(),
            phone: form.find('input[name=phone]').val(),
            message: form.find('textarea').val(),
        };
        // console.log($(this));
        $.post("send.php", data, function (req) {
            closePopup();
            form[0].reset();
            showPopup(popupThanks);
        })
    });

    /** More Works **/
    $('.js-more-works').on('click', function (e) {
        let span = $(this).find('span'),
            text = span.text();
        $('.js-show-card').toggleClass('b-works__card--hidden');
        text = text == 'Показать еще' ? 'Скрыть' : 'Показать еще';
        span.text(text);
    })

    /** Show Popup card info **/
    $('.js-show-card').on('click', function () {
        let name = $(this).find('.js-name').text(),
            text = $(this).find('.js-text').text(),
            img  = $(this).find('img').attr('src'),
            popupName = popupCard.find('.b-popup__title'),
            poputText = popupCard.find('.b-popup__text'),
            popupImg  = popupCard.find('.b-popup__img');
        popupName.text(name);
        poputText.text(text);
        popupImg.attr('src', img);
        showPopup(popupCard);
    })
});
