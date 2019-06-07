import './stylus/style.styl'
import $ from 'jquery'
require('webpack-jquery-ui/slider');

$('.search-input__img').on('click', function() {
    $(this).parent().toggleClass('active');
});

$('.main-slider__slide').hover(
    function() {
        $('.main-slider__slide').removeClass("active inactive");
        $(this).addClass("active");
        $(this).prevAll().addClass("inactive");
    },
    function() {

    }
);

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