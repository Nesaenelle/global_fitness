import './stylus/style.styl'
import * as $ from 'jquery'


$('.search-input__img').on('click', function() {
	$(this).parent().toggleClass('active');
});

$('.main-slider__slide').hover(
  function() {
  	$('.main-slider__slide').removeClass( "active inactive" );
    $( this ).addClass( "active" );
    $( this ).prevAll().addClass( "inactive");
  }, function() {
    // $( this ).removeClass( "active" );
  }
);