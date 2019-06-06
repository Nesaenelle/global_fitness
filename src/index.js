import './stylus/style.styl'
import * as $ from 'jquery'


$('.search-input__img').on('click', function() {
	$(this).parent().toggleClass('active');
});