import './stylus/style.styl'
import $ from 'jquery'
require('webpack-jquery-ui/slider');

$('.search-input__img').on('click', function() {
    $(this).parent().toggleClass('active');
});


setTimeout(()=> {
    $('.main-slider__slide').hover(
        function() {
            $('.main-slider__slide').removeClass("active inactive");
            $(this).addClass("active");
            $(this).prevAll().addClass("inactive");
        },
        function() {

        }
    );
}, 2000)

$('.catalog__filter__section--title').on('click', function() {
    $(this).next().stop().slideToggle(200);
    $(this).toggleClass('active');
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
    $('.product-card__main__slider__img img').attr('src', src);
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
});

$('[modal-button]').on('click', function(e) {
    e.stopPropagation();
    var id = $(this).attr('modal-button');
    $('.modal').removeClass('active');
    
    $('.modal--overlay').addClass('active');
    $('.modal').filter(`[modal-id=${id}]`).addClass('active');
});

$('[modal-close]').on('click', function() {
    $('.modal--overlay').removeClass('active');
    $('.modal').removeClass('active');
});