import './stylus/style.styl'
import $ from 'jquery'
import './animate'
import './jquery.magnify.js'
import Typed from 'typed.js';

require('webpack-jquery-ui/slider');

$('.search-input__img').on('click', function() {
    $(this).parent().toggleClass('active');
});

$('.burger').on('click', function(e) {
    e.stopPropagation()
    $(this).toggleClass('opened')
    $('.dropdown-menu').toggleClass('opened')
});

var fakePlaceholderIsShown = false;
var typedInstance;

$('.home-page .search-block__input input').on('focus', function() {
    if (typedInstance) {
        typedInstance.destroy();
    }
});

setTimeout(() => {
    $('.main-slider__slide').hover(
        function() {
            var id = $(this).data('slide-id');
            $('.main-slider__slide').removeClass("active inactive");
            $(this).addClass("active");
            $(this).prevAll().addClass("inactive");

            if (id == 2 && !fakePlaceholderIsShown) {
                var placeholder = $('.home-page .search-block__input input').data('placeholder');

                typedInstance = new Typed('.home-page .search-block__input input', {
                    strings: [placeholder],
                    typeSpeed: 150,
                    fadeOut: true,
                    startDelay: 300,
                });

                fakePlaceholderIsShown = true;
            }
        },
        function() {

        }
    );
}, 500)

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

$('[data-tab-id]').on('click', function() {
    let id = $(this).data('tab-id');
    $(this).parent().children().removeClass('active');
    $(this).addClass('active');
    $(`[data-tab]`).hide();
    $(`[data-tab=${id}]`).show();
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
    if (!$(this).closest('[data-dropdown]').hasClass('active')) {
        $('[data-dropdown]').removeClass('active');
    }

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

    if ($('.modal.active').length && !$('.modal.active .modal--body')[0].contains(e.target)) {
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


let favoritesPool = [];
$('.catalog__goods__grid__item--favorite, .product-card__main__slider--favorite').on('click', function() {
    $(this).toggleClass('active');

    let exists = favoritesPool.filter(r => r.is($(this)))[0];
    if (exists) {
        favoritesPool = favoritesPool.filter(r => !r.is($(this)));
    } else {
        favoritesPool.push($(this));
    }

    if (favoritesPool.length > 0) {
        $('header .favorites').addClass('active');
    } else {
        $('header .favorites').removeClass('active');
    }

    $('header .favorites--value').text(favoritesPool.length);
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




/***********MAP***********/

var FULL_DATA = [{ "Code": "AF", "Name": "Afghanistan" }, { "Code": "AX", "Name": "\u00c5land Islands" }, { "Code": "AL", "Name": "Albania" }, { "Code": "DZ", "Name": "Algeria" }, { "Code": "AS", "Name": "American Samoa" }, { "Code": "AD", "Name": "Andorra" }, { "Code": "AO", "Name": "Angola" }, { "Code": "AI", "Name": "Anguilla" }, { "Code": "AQ", "Name": "Antarctica" }, { "Code": "AG", "Name": "Antigua and Barbuda" }, { "Code": "AR", "Name": "Argentina" }, { "Code": "AM", "Name": "Armenia" }, { "Code": "AW", "Name": "Aruba" }, { "Code": "AU", "Name": "Australia" }, { "Code": "AT", "Name": "Austria" }, { "Code": "AZ", "Name": "Azerbaijan" }, { "Code": "BS", "Name": "Bahamas" }, { "Code": "BH", "Name": "Bahrain" }, { "Code": "BD", "Name": "Bangladesh" }, { "Code": "BB", "Name": "Barbados" }, { "Code": "BY", "Name": "Belarus" }, { "Code": "BE", "Name": "Belgium" }, { "Code": "BZ", "Name": "Belize" }, { "Code": "BJ", "Name": "Benin" }, { "Code": "BM", "Name": "Bermuda" }, { "Code": "BT", "Name": "Bhutan" }, { "Code": "BO", "Name": "Bolivia, Plurinational State of" }, { "Code": "BQ", "Name": "Bonaire, Sint Eustatius and Saba" }, { "Code": "BA", "Name": "Bosnia and Herzegovina" }, { "Code": "BW", "Name": "Botswana" }, { "Code": "BV", "Name": "Bouvet Island" }, { "Code": "BR", "Name": "Brazil" }, { "Code": "IO", "Name": "British Indian Ocean Territory" }, { "Code": "BN", "Name": "Brunei Darussalam" }, { "Code": "BG", "Name": "Bulgaria" }, { "Code": "BF", "Name": "Burkina Faso" }, { "Code": "BI", "Name": "Burundi" }, { "Code": "KH", "Name": "Cambodia" }, { "Code": "CM", "Name": "Cameroon" }, { "Code": "CA", "Name": "Canada" }, { "Code": "CV", "Name": "Cape Verde" }, { "Code": "KY", "Name": "Cayman Islands" }, { "Code": "CF", "Name": "Central African Republic" }, { "Code": "TD", "Name": "Chad" }, { "Code": "CL", "Name": "Chile" }, { "Code": "CN", "Name": "China" }, { "Code": "CX", "Name": "Christmas Island" }, { "Code": "CC", "Name": "Cocos (Keeling) Islands" }, { "Code": "CO", "Name": "Colombia" }, { "Code": "KM", "Name": "Comoros" }, { "Code": "CG", "Name": "Congo" }, { "Code": "CD", "Name": "Congo, the Democratic Republic of the" }, { "Code": "CK", "Name": "Cook Islands" }, { "Code": "CR", "Name": "Costa Rica" }, { "Code": "CI", "Name": "C\u00f4te d'Ivoire" }, { "Code": "HR", "Name": "Croatia" }, { "Code": "CU", "Name": "Cuba" }, { "Code": "CW", "Name": "Cura\u00e7ao" }, { "Code": "CY", "Name": "Cyprus" }, { "Code": "CZ", "Name": "Czech Republic" }, { "Code": "DK", "Name": "Denmark" }, { "Code": "DJ", "Name": "Djibouti" }, { "Code": "DM", "Name": "Dominica" }, { "Code": "DO", "Name": "Dominican Republic" }, { "Code": "EC", "Name": "Ecuador" }, { "Code": "EG", "Name": "Egypt" }, { "Code": "SV", "Name": "El Salvador" }, { "Code": "GQ", "Name": "Equatorial Guinea" }, { "Code": "ER", "Name": "Eritrea" }, { "Code": "EE", "Name": "Estonia" }, { "Code": "ET", "Name": "Ethiopia" }, { "Code": "FK", "Name": "Falkland Islands (Malvinas)" }, { "Code": "FO", "Name": "Faroe Islands" }, { "Code": "FJ", "Name": "Fiji" }, { "Code": "FI", "Name": "Finland" }, { "Code": "FR", "Name": "France" }, { "Code": "GF", "Name": "French Guiana" }, { "Code": "PF", "Name": "French Polynesia" }, { "Code": "TF", "Name": "French Southern Territories" }, { "Code": "GA", "Name": "Gabon" }, { "Code": "GM", "Name": "Gambia" }, { "Code": "GE", "Name": "Georgia" }, { "Code": "DE", "Name": "Germany" }, { "Code": "GH", "Name": "Ghana" }, { "Code": "GI", "Name": "Gibraltar" }, { "Code": "GR", "Name": "Greece" }, { "Code": "GL", "Name": "Greenland" }, { "Code": "GD", "Name": "Grenada" }, { "Code": "GP", "Name": "Guadeloupe" }, { "Code": "GU", "Name": "Guam" }, { "Code": "GT", "Name": "Guatemala" }, { "Code": "GG", "Name": "Guernsey" }, { "Code": "GN", "Name": "Guinea" }, { "Code": "GW", "Name": "Guinea-Bissau" }, { "Code": "GY", "Name": "Guyana" }, { "Code": "HT", "Name": "Haiti" }, { "Code": "HM", "Name": "Heard Island and McDonald Islands" }, { "Code": "VA", "Name": "Holy See (Vatican City State)" }, { "Code": "HN", "Name": "Honduras" }, { "Code": "HK", "Name": "Hong Kong" }, { "Code": "HU", "Name": "Hungary" }, { "Code": "IS", "Name": "Iceland" }, { "Code": "IN", "Name": "India" }, { "Code": "ID", "Name": "Indonesia" }, { "Code": "IR", "Name": "Iran, Islamic Republic of" }, { "Code": "IQ", "Name": "Iraq" }, { "Code": "IE", "Name": "Ireland" }, { "Code": "IM", "Name": "Isle of Man" }, { "Code": "IL", "Name": "Israel" }, { "Code": "IT", "Name": "Italy" }, { "Code": "JM", "Name": "Jamaica" }, { "Code": "JP", "Name": "Japan" }, { "Code": "JE", "Name": "Jersey" }, { "Code": "JO", "Name": "Jordan" }, { "Code": "KZ", "Name": "Kazakhstan" }, { "Code": "KE", "Name": "Kenya" }, { "Code": "KI", "Name": "Kiribati" }, { "Code": "KP", "Name": "Korea, Democratic People's Republic of" }, { "Code": "KR", "Name": "Korea, Republic of" }, { "Code": "KW", "Name": "Kuwait" }, { "Code": "KG", "Name": "Kyrgyzstan" }, { "Code": "LA", "Name": "Lao People's Democratic Republic" }, { "Code": "LV", "Name": "Latvia" }, { "Code": "LB", "Name": "Lebanon" }, { "Code": "LS", "Name": "Lesotho" }, { "Code": "LR", "Name": "Liberia" }, { "Code": "LY", "Name": "Libya" }, { "Code": "LI", "Name": "Liechtenstein" }, { "Code": "LT", "Name": "Lithuania" }, { "Code": "LU", "Name": "Luxembourg" }, { "Code": "MO", "Name": "Macao" }, { "Code": "MK", "Name": "Macedonia, the Former Yugoslav Republic of" }, { "Code": "MG", "Name": "Madagascar" }, { "Code": "MW", "Name": "Malawi" }, { "Code": "MY", "Name": "Malaysia" }, { "Code": "MV", "Name": "Maldives" }, { "Code": "ML", "Name": "Mali" }, { "Code": "MT", "Name": "Malta" }, { "Code": "MH", "Name": "Marshall Islands" }, { "Code": "MQ", "Name": "Martinique" }, { "Code": "MR", "Name": "Mauritania" }, { "Code": "MU", "Name": "Mauritius" }, { "Code": "YT", "Name": "Mayotte" }, { "Code": "MX", "Name": "Mexico" }, { "Code": "FM", "Name": "Micronesia, Federated States of" }, { "Code": "MD", "Name": "Moldova, Republic of" }, { "Code": "MC", "Name": "Monaco" }, { "Code": "MN", "Name": "Mongolia" }, { "Code": "ME", "Name": "Montenegro" }, { "Code": "MS", "Name": "Montserrat" }, { "Code": "MA", "Name": "Morocco" }, { "Code": "MZ", "Name": "Mozambique" }, { "Code": "MM", "Name": "Myanmar" }, { "Code": "NA", "Name": "Namibia" }, { "Code": "NR", "Name": "Nauru" }, { "Code": "NP", "Name": "Nepal" }, { "Code": "NL", "Name": "Netherlands" }, { "Code": "NC", "Name": "New Caledonia" }, { "Code": "NZ", "Name": "New Zealand" }, { "Code": "NI", "Name": "Nicaragua" }, { "Code": "NE", "Name": "Niger" }, { "Code": "NG", "Name": "Nigeria" }, { "Code": "NU", "Name": "Niue" }, { "Code": "NF", "Name": "Norfolk Island" }, { "Code": "MP", "Name": "Northern Mariana Islands" }, { "Code": "NO", "Name": "Norway" }, { "Code": "OM", "Name": "Oman" }, { "Code": "PK", "Name": "Pakistan" }, { "Code": "PW", "Name": "Palau" }, { "Code": "PS", "Name": "Palestine, State of" }, { "Code": "PA", "Name": "Panama" }, { "Code": "PG", "Name": "Papua New Guinea" }, { "Code": "PY", "Name": "Paraguay" }, { "Code": "PE", "Name": "Peru" }, { "Code": "PH", "Name": "Philippines" }, { "Code": "PN", "Name": "Pitcairn" }, { "Code": "PL", "Name": "Poland" }, { "Code": "PT", "Name": "Portugal" }, { "Code": "PR", "Name": "Puerto Rico" }, { "Code": "QA", "Name": "Qatar" }, { "Code": "RE", "Name": "R\u00e9union" }, { "Code": "RO", "Name": "Romania" }, { "Code": "RU", "Name": "Russian Federation" }, { "Code": "RW", "Name": "Rwanda" }, { "Code": "BL", "Name": "Saint Barth\u00e9lemy" }, { "Code": "SH", "Name": "Saint Helena, Ascension and Tristan da Cunha" }, { "Code": "KN", "Name": "Saint Kitts and Nevis" }, { "Code": "LC", "Name": "Saint Lucia" }, { "Code": "MF", "Name": "Saint Martin (French part)" }, { "Code": "PM", "Name": "Saint Pierre and Miquelon" }, { "Code": "VC", "Name": "Saint Vincent and the Grenadines" }, { "Code": "WS", "Name": "Samoa" }, { "Code": "SM", "Name": "San Marino" }, { "Code": "ST", "Name": "Sao Tome and Principe" }, { "Code": "SA", "Name": "Saudi Arabia" }, { "Code": "SN", "Name": "Senegal" }, { "Code": "RS", "Name": "Serbia" }, { "Code": "SC", "Name": "Seychelles" }, { "Code": "SL", "Name": "Sierra Leone" }, { "Code": "SG", "Name": "Singapore" }, { "Code": "SX", "Name": "Sint Maarten (Dutch part)" }, { "Code": "SK", "Name": "Slovakia" }, { "Code": "SI", "Name": "Slovenia" }, { "Code": "SB", "Name": "Solomon Islands" }, { "Code": "SO", "Name": "Somalia" }, { "Code": "ZA", "Name": "South Africa" }, { "Code": "GS", "Name": "South Georgia and the South Sandwich Islands" }, { "Code": "SS", "Name": "South Sudan" }, { "Code": "ES", "Name": "Spain" }, { "Code": "LK", "Name": "Sri Lanka" }, { "Code": "SD", "Name": "Sudan" }, { "Code": "SR", "Name": "Suriname" }, { "Code": "SJ", "Name": "Svalbard and Jan Mayen" }, { "Code": "SZ", "Name": "Swaziland" }, { "Code": "SE", "Name": "Sweden" }, { "Code": "CH", "Name": "Switzerland" }, { "Code": "SY", "Name": "Syrian Arab Republic" }, { "Code": "TW", "Name": "Taiwan, Province of China" }, { "Code": "TJ", "Name": "Tajikistan" }, { "Code": "TZ", "Name": "Tanzania, United Republic of" }, { "Code": "TH", "Name": "Thailand" }, { "Code": "TL", "Name": "Timor-Leste" }, { "Code": "TG", "Name": "Togo" }, { "Code": "TK", "Name": "Tokelau" }, { "Code": "TO", "Name": "Tonga" }, { "Code": "TT", "Name": "Trinidad and Tobago" }, { "Code": "TN", "Name": "Tunisia" }, { "Code": "TR", "Name": "Turkey" }, { "Code": "TM", "Name": "Turkmenistan" }, { "Code": "TC", "Name": "Turks and Caicos Islands" }, { "Code": "TV", "Name": "Tuvalu" }, { "Code": "UG", "Name": "Uganda" }, { "Code": "UA", "Name": "Ukraine" }, { "Code": "AE", "Name": "United Arab Emirates" }, { "Code": "GB", "Name": "United Kingdom" }, { "Code": "US", "Name": "United States" }, { "Code": "UM", "Name": "United States Minor Outlying Islands" }, { "Code": "UY", "Name": "Uruguay" }, { "Code": "UZ", "Name": "Uzbekistan" }, { "Code": "VU", "Name": "Vanuatu" }, { "Code": "VE", "Name": "Venezuela, Bolivarian Republic of" }, { "Code": "VN", "Name": "Viet Nam" }, { "Code": "VG", "Name": "Virgin Islands, British" }, { "Code": "VI", "Name": "Virgin Islands, U.S." }, { "Code": "WF", "Name": "Wallis and Futuna" }, { "Code": "EH", "Name": "Western Sahara" }, { "Code": "YE", "Name": "Yemen" }, { "Code": "ZM", "Name": "Zambia" }, { "Code": "ZW", "Name": "Zimbabwe" }];


var countriesEU = [
    'RU', 'FR', 'UA', 'SE', 'BY', 'SK', 'SI', 'RS', 'ES', 'RO', 'DE',
    'NL', 'GB', 'PT', 'IS', 'NO', 'TR', 'BG', 'MD', 'IT', 'PL', 'GR',
    'IE', 'CH', 'CZ', 'AT', 'LT', 'LV', 'EE', 'FI', 'CY', 'MK', 'BE',
    'LU', 'DK', 'HU', 'BA', 'HR', 'AL', 'ME', 'AM', 'GE', 'FO'
];

var countriesAsian = [
    'CN', 'JP', 'MY', 'ID', 'PG', 'AU', 'NZ', 'SB', 'NC', 'TL',
    'PH', 'VN', 'TH', 'TW', 'BN', 'KP', 'KR', 'FJ', 'VU', 'SG'
];

var countriesAfrica = [
    'TD', 'DZ', 'LY', 'EG', 'SD', 'TD', 'MR', 'ML', 'NG', 'NE', 'CD',
    'AO', 'ZA', 'BW', 'NA', 'ZW', 'MZ', 'TZ', 'KE', 'ET', 'GA', 'CG',
    'CM', 'BJ', 'TG', 'GH', 'BF', 'CI', 'LR', 'SL', 'CF', 'GQ', 'SO',
    'SZ', 'LS', 'ZM', 'SS', 'MW', 'UG', 'GN', 'SN', 'MA', 'ER', 'RW',
    'BI', 'MG', 'GM', 'GW', 'EH', 'TN', 'RE', 'MU', 'DJ', 'SC'
];

var europeRegion = countriesEU.map(r => '#world-map path#' + r);
var asianRegion = countriesAsian.map(r => '#world-map path#' + r);
var africaRegion = countriesAfrica.map(r => '#world-map path#' + r);

var currentRegion;
var europeCountriesList = [];
var asiaCountriesList = [];
var africaCountriesList = [];

$('.world-map__list__item').hover(
    function() {
        let id = $(this).data('region-id');
        //find on svg

        if (id === 'europe') {
            $(europeRegion.join(',')).addClass('active')
            $(`#world-map [data-id=${id}]`).addClass('active')
        }

        if (id === 'asian') {
            $(asianRegion.join(',')).addClass('active')
            $(`#world-map [data-id=${id}]`).addClass('active')
        }

        if (id === 'africa') {
            $(africaRegion.join(',')).addClass('active')
            $(`#world-map [data-id=${id}]`).addClass('active')
        }
    },
    function() {
        let id = $(this).data('region-id');
        if (id === 'europe') {
            $(europeRegion.join(',')).removeClass('active')
            $(`#world-map [data-id=${id}]`).removeClass('active')
        }

        if (id === 'asian') {
            $(asianRegion.join(',')).removeClass('active')
            $(`#world-map [data-id=${id}]`).removeClass('active')
        }

        if (id === 'africa') {
            $(africaRegion.join(',')).removeClass('active')
            $(`#world-map [data-id=${id}]`).removeClass('active')
        }
    }
);


$('.world-map__list__item__dropdown__list').on({
    mouseover: function() {
        let id = $(this).data('country-id');
        var selector = '';
        var countryLabel = ''

        if (currentRegion === 'europe') {
            selector = '#europe-map #' + id;
            countryLabel = `#europe-map [data-id=${id}]`;
        }
        if (currentRegion === 'asian') {
            selector = '#asian-map #' + id;
            countryLabel = `#asian-map [data-id=${id}]`;
        }
        if (currentRegion === 'africa') {
            selector = '#africa-map #' + id;
            countryLabel = `#africa-map [data-id=${id}]`;
        }
        $(selector).addClass('active');
        $(countryLabel).addClass('active');
    },
    mouseout: function() {
        let id = $(this).data('country-id');

        var selector = '';
        var countryLabel = ''

        if (currentRegion === 'europe') {
            selector = '#europe-map #' + id;
            countryLabel = `#europe-map [data-id=${id}]`;
        }
        if (currentRegion === 'asian') {
            selector = '#asian-map #' + id;
            countryLabel = `#asian-map [data-id=${id}]`;
        }
        if (currentRegion === 'africa') {
            selector = '#africa-map #' + id;
            countryLabel = `#africa-map [data-id=${id}]`;
        }

        $(selector).removeClass('active');
        $(countryLabel).removeClass('active');
    }
}, '.world-map__list__item__dropdown__list--item');

$('#world-map path').hover(
    function() {
        let id = $(this).attr('id');
        if(countriesEU.indexOf(id) > -1) {
            $(europeRegion.join(',')).addClass('active')
            $(`#world-map [data-id='europe']`).addClass('active')
        }  
        if(countriesAsian.indexOf(id) > -1) {
            $(asianRegion.join(',')).addClass('active')
            $(`#world-map [data-id='asian']`).addClass('active')
        }  
        if(countriesAfrica.indexOf(id) > -1) {
            $(africaRegion.join(',')).addClass('active')
            $(`#world-map [data-id='africa']`).addClass('active')
        }  
    },
    function() {
        let id = $(this).attr('id');
        if(countriesEU.indexOf(id) > -1) {
            $(europeRegion.join(',')).removeClass('active')
            $(`#world-map [data-id='europe']`).removeClass('active')
        }  
        if(countriesAsian.indexOf(id) > -1) {
            $(asianRegion.join(',')).removeClass('active')
            $(`#world-map [data-id='asian']`).removeClass('active')
        }  
        if(countriesAfrica.indexOf(id) > -1) {
            $(africaRegion.join(',')).removeClass('active')
            $(`#world-map [data-id='africa']`).removeClass('active')
        }  
    });

$('#europe-map path, #asian-map path, #africa-map path').hover(
    function() {
        let id = $(this).attr('id');

        if(countriesEU.indexOf(id) > -1) {
            $(`#europe-map [data-id=${id}]`).addClass('active')
            $(this).addClass('active')
        }  

        if(countriesAsian.indexOf(id) > -1) {
            $(`#asian-map [data-id=${id}]`).addClass('active')
            $(this).addClass('active')
        }  

        if(countriesAfrica.indexOf(id) > -1) {
            $(`#africa-map [data-id=${id}]`).addClass('active')
            $(this).addClass('active')
        }  

    },
    function() {
        let id = $(this).attr('id');
        if(countriesEU.indexOf(id) > -1) {
            $(`#europe-map [data-id=${id}]`).removeClass('active')
            $(this).removeClass('active')
        }  

        if(countriesAsian.indexOf(id) > -1) {
            $(`#asian-map [data-id=${id}]`).removeClass('active')
            $(this).removeClass('active')
        }  

        if(countriesAfrica.indexOf(id) > -1) {
            $(`#africa-map [data-id=${id}]`).removeClass('active')
            $(this).removeClass('active')
        }  
    });


$('.world-map__list__item').on('click', function() {
    let id = $(this).data('region-id');

    $('.world-map').removeClass(currentRegion)

    if (id === 'europe') {
        currentRegion = 'europe';
        $('.world-map').addClass(currentRegion)
        if (!$('#europe-map .group').length) {
            loadEuropeMapInfo();
        }
        drawCountriesList(europeCountriesList);
    }

    if (id === 'asian') {
        currentRegion = 'asian';
        $('.world-map').addClass(currentRegion)
        if (!$('#asian-map .group').length) {
            loadAsianMapInfo();
        }
        drawCountriesList(asiaCountriesList);
    }

    if (id === 'africa') {
        currentRegion = 'africa';
        $('.world-map').addClass(currentRegion)
        if (!$('#africa-map .group').length) {
            loadAfricaMapInfo();
        }
        drawCountriesList(africaCountriesList);
    }

    if (id === 'back') {
        currentRegion = null;
        $('.world-map').removeClass(currentRegion)
    }
});


loadWorldMapInfo();



function drawCountriesList(list) {
    $('.world-map__list__item__dropdown__list').empty();
    list.forEach(item => {
        $('.world-map__list__item__dropdown__list').append(`
            <a href="" class="world-map__list__item__dropdown__list--item" data-country-id=${item.Code}> ${item.Name}</a>    
        `);
    });
}


function loadWorldMapInfo() {
    var body = d3.select("body");
    var svg = body.select("#world-map");

    var group = svg.append("g")
        .attr('class', 'group')

    var fontSize = '20px';

    var text = "Europe";
    var size = textSize(text, fontSize);

    size.width = size.width + 10;
    size.height = size.height + 1;

    // addRectToGroup('europe', group, [1050 - 3, 270 - 10], size);
    addMarkerToGroup('europe', group, [1050 - 27, 260 - 23], { width: 28, height: 28 });

    addTextToGroup('europe', group, [1050, 260], text, fontSize);


    var text = "Asia pacific";
    var size = textSize(text, fontSize);

    size.width = size.width + 10;
    size.height = size.height + 1;

    // addRectToGroup('asian', group, [1520 - 3, 350 - 10], size);
    addMarkerToGroup('asian', group, [1520 - 27, 350 - 23], { width: 28, height: 28 });
    addTextToGroup('asian', group, [1520, 350], text, fontSize);


    var text = "Africa";
    var size = textSize(text, fontSize);

    size.width = size.width + 10;
    size.height = size.height + 1;

    // addRectToGroup('africa', group, [1050 - 3, 500 - 10], size);
    addMarkerToGroup('africa', group, [1050 - 27, 500 - 23], { width: 28, height: 28 });
    addTextToGroup('africa', group, [1050, 500], text, fontSize);

}

function loadEuropeMapInfo() {
    var body = d3.select("body");
    var svg = body.select("#europe-map");

    var group = svg.append("g")
        .attr('class', 'group')

    countriesEU.forEach((country) => {
        var xxx = svg.select('#' + country);

        var center = getBoundingBoxCenter(xxx);

        var full = FULL_DATA.filter(r => r.Code === country)[0];

        var size = textSize(full.Name, '10px');

        size.width = size.width + 6;
        size.height = size.height + 1;

        if (country === 'RU') {
            center = [1200, 200];
        }


        // addRectToGroup(country, group, center, size);
        addTextToGroup(country, group, center, full.Name, '10px');

        center[0] = center[0] - 13;
        center[1] = center[1] - 12;

        addMarkerToGroup(country, group, center, { width: 14, height: 14 });

        europeCountriesList.push(FULL_DATA.filter(r => r.Code === country)[0]);
    });

}

function loadAsianMapInfo() {
    var body = d3.select("body");
    var svg = body.select("#asian-map");

    var group = svg.append("g")
        .attr('class', 'group')

    countriesAsian.forEach((country) => {
        var xxx = svg.select('#' + country);


        var center = getBoundingBoxCenter(xxx);

        var full = FULL_DATA.filter(r => r.Code === country)[0];

        var size = textSize(full.Name, '14px');

        size.width = size.width + 6;
        size.height = size.height + 1;

        // addRectToGroup(country, group, center, size);
        addTextToGroup(country, group, center, full.Name, '14px');

        center[0] = center[0] - 24;
        center[1] = center[1] - 20;

        addMarkerToGroup(country, group, center, { width: 22, height: 22 });

        asiaCountriesList.push(FULL_DATA.filter(r => r.Code === country)[0]);
    });
}

function loadAfricaMapInfo() {
    var body = d3.select("body");
    var svg = body.select("#africa-map");

    var group = svg.append("g")
        .attr('class', 'group')

    countriesAfrica.forEach((country) => {
        var xxx = svg.select('#' + country);

        var center = getBoundingBoxCenter(xxx);

        var full = FULL_DATA.filter(r => r.Code === country)[0];

        var size = textSize(full.Name, '12px');

        size.width = size.width + 6;
        size.height = size.height + 1;

        // addRectToGroup(country, group, center, size);
        addTextToGroup(country, group, center, full.Name, '12px');

        center[0] = center[0] - 20;
        center[1] = center[1] - 18;

        addMarkerToGroup(country, group, center, { width: 18, height: 18 });

        africaCountriesList.push(FULL_DATA.filter(r => r.Code === country)[0]);
    });
}


function textSize(text, fontSize) {
    if (!d3) return;
    var container = d3.select('body').append('svg');
    var a = container
        .append('text')
        .style("font-size", fontSize)
        .text(text);
    var size = container.node().getBBox();
    container.remove();
    return { width: size.width, height: size.height };
}

function addMarkerToGroup(id, group, center, size) {
    return group.append("svg:image")
        .attr('x', center[0])
        .attr('y', center[1])
        .attr('width', size.width)
        .attr('height', size.height)
        .attr('class', 'country-label')
        .attr("xlink:href", "img/marker.svg")
        .attr('data-id', id)
}

function addRectToGroup(id, group, center, size) {
    return group.append('rect')
        .attr('x', center[0] - 3)
        .attr('y', center[1] - 10)
        .attr('fill', '#3296f5')
        .attr('width', size.width)
        .attr('height', size.height)
        .attr('class', 'country-label')
        .attr('data-id', id)
}

function addTextToGroup(id, group, center, text, fontSize) {
    return group.append('text')
        .attr('x', center[0])
        .attr('y', center[1])
        .attr('fill', '#000')
        .style("font-size", fontSize)
        .style("font-weight", 'bold')
        .style("font-family", 'Open Sans')
        .attr('class', 'country-label')
        .attr('data-id', id)
        .text(text)
}


function getBoundingBoxCenter(selection) {
    // get the DOM element from a D3 selection
    // you could also use "this" inside .each()
    var element = selection.node();
    // use the native SVG interface to get the bounding box
    var bbox = element.getBBox();
    // return the center of the bounding box
    return [bbox.x + bbox.width / 2, bbox.y + bbox.height / 2];
}


/***********MAP***********/