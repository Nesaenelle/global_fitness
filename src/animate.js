import $ from 'jquery'
var elements = $('[data-animate]');

function update() {
    elements.each(function(i, elem) {
        if (isInViewport(elem, 150)) {
            if (!elem.getAttribute('data-animate')) {
                elem.setAttribute('data-animate', true);
            }
        }
    });
}

update();
window.addEventListener('scroll', function() {
    update();
});


function isInViewport(el, offset) {
    var top = el.offsetTop + offset;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }

    return (
        top < (window.pageYOffset + window.innerHeight) &&
        left < (window.pageXOffset + window.innerWidth) &&
        (top + height) > window.pageYOffset &&
        (left + width) > window.pageXOffset
    );
};