import './stylus/style.styl'
import $ from 'jquery'
import './animate'
import './jquery.magnify.js'

require('webpack-jquery-ui/slider');

$('.search-input__img').on('click', function() {
    $(this).parent().toggleClass('active');
});

$('.burger').on('click', function(e) {
    e.stopPropagation()
    $(this).toggleClass('opened')
    $('.dropdown-menu').toggleClass('opened')
});


setTimeout(() => {
    $('.main-slider__slide').hover(
        function() {
            $('.main-slider__slide').removeClass("active inactive");
            $(this).addClass("active");
            $(this).prevAll().addClass("inactive");
        },
        function() {

        }
    );
}, 1000)

$('.catalog__filter__section--title').on('click', function() {
    $(this).next().stop().slideToggle(200);
    $(this).toggleClass('active');
});

$('.catalog__filter-switcher').on('click', function(e) {
    e.stopPropagation();
    $('.catalog__filter').toggleClass('active');
});

$('.catalog__filter--close').on('click', function() {
    $('.catalog__filter').removeClass('active');
});

$(".slider-range").slider({
    range: true,
    min: 0,
    max: 8000,
    values: [3000, 6000],
    slide: function(event, ui) {
        $('.slider-range__from input').val(ui.values[0]);
        $('.slider-range__to input').val(ui.values[1]);
    },
    create: function() {
        $('.slider-range__from input').val($(".slider-range").slider("values")[0]);
        $('.slider-range__to input').val($(".slider-range").slider("values")[1]);
    }
});


$('.compare-list__item__top--add').on('click', function() {
    var compItem = $('.compare-list__scroller').find('.compare-list__item:first').clone();
    $('.compare-list__scroller').append(compItem);
});

$('.catalog__goods .catalog__goods__bottom .btn').on('click', function() {
    var gridItems = $('.catalog__goods__grid .catalog__goods__grid__item').slice(0, 12).clone();
    $('.catalog__goods__grid').append(gridItems);
});

$('.product-card__menu--item').on('click', function() {
    $('.product-card__menu--item').removeClass('active');
    $(this).addClass('active');
});

$('.product-card__main__slider__thumbs--item').on('click', function() {
    var src = $(this).find('img').attr('src');
    var bigImg = $(this).find('img').attr('data-magnify-src');
    $('.product-card__main__slider__img img').attr('src', src);
    $('.product-card__main__slider__img img').attr('data-magnify-src', bigImg);

    if (magnifyInstance) {
        magnifyInstance.destroy();
        magnifyInit();
    }

});

$('.input-number').each(function(i, el) {
    var input = el.querySelector('input');
    var initValue = input.getAttribute('init-value');
    var maxValue = parseInt(input.getAttribute('max-value'));
    var prefix = input.getAttribute('prefix') || '';
    var upArrow = document.createElement('div');
    var downArrow = document.createElement('div');

    upArrow.classList.add('input-number--up');
    downArrow.classList.add('input-number--down');

    input.setAttribute('readonly', true);
    input.value = initValue + prefix;

    el.appendChild(upArrow);
    el.prepend(downArrow);

    upArrow.addEventListener('click', function() {
        var curValue = parseInt(input.value)
        if (curValue < maxValue) {
            input.value = parseInt(input.value) + 1 + prefix;
        }

    }, false);
    downArrow.addEventListener('click', function() {
        var curValue = parseInt(input.value)
        if (curValue > 0) {
            input.value = parseInt(input.value) - 1 + prefix;
        }
    }, false);
});

$('[data-dropdown-value]').on('click', function(e) {
    e.stopPropagation();
    $('[data-dropdown]').removeClass('active');
    $(this).closest('[data-dropdown]').toggleClass('active');
});

$('[data-dropdown-item]').on('click', function(e) {
    var text = $(this).text();
    $(this).closest('[data-dropdown]').find('[data-dropdown-value]').text(text);
    $(this).closest('[data-dropdown]').removeClass('active');
});

$(window).on('click', function(e) {
    if ($('[data-dropdown]').length && !$('[data-dropdown]')[0].contains(e.target)) {
        $('[data-dropdown]').removeClass('active');
    }

    if ($('.modal--body').length && !$('.modal--body')[0].contains(e.target)) {
        $('.modal').removeClass('active');
        $('.modal--overlay').removeClass('active');
    }

    if ($('.catalog__filter').length && !$('.catalog__filter')[0].contains(e.target)) {
        $('.catalog__filter').removeClass('active')
    }

    if ($('.burger').length && !$('.dropdown-menu')[0].contains(e.target)) {
        $('.burger').removeClass('opened')
        $('.dropdown-menu').removeClass('opened')
    }
});

$('[data-modal-button]').on('click', function(e) {
    e.stopPropagation();
    var id = $(this).attr('data-modal-button');
    $('.modal').removeClass('active');

    $('.modal--overlay').addClass('active');
    $('.modal').filter(`[data-modal-id=${id}]`).addClass('active');
});

$('[data-modal-close]').on('click', function() {
    $('.modal--overlay').removeClass('active');
    $('.modal').removeClass('active');
});

$('.catalog__goods__grid__item--favorite').on('click', function() {
    $(this).toggleClass('active')
});


var magnifyInstance = undefined;

$('.product-card__main__slider--zoom').on('click', function() {
    if (magnifyInstance) {
        magnifyInstance.destroy();
        magnifyInstance = undefined;
    } else {
        magnifyInit();
    }
});


function magnifyInit() {
    magnifyInstance = $('.product-card__main__slider__img img').magnify({
        'src': '',
        'speed': 100,
        'timeout': -1,
        'touchBottomOffset': 0,
        'finalWidth': null,
        'finalHeight': null,
        'magnifiedWidth': null,
        'magnifiedHeight': null,
        'limitBounds': false,
        'mobileCloseEvent': 'touchstart',
        'afterLoad': function() {}
    });
}