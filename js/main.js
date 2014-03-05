/*http://pingvisha.ru*/
function map (address) {
    return function init() {
        var myMap = new ymaps.Map('map', {
            center: [55.753994, 37.622093],
            zoom: 9,
            behaviors: ['default', 'scrollZoom']
        });
        ymaps.geocode(address, {
            results: 1
        }).then(function (res) {
                var firstGeoObject = res.geoObjects.get(0),
                    coords = firstGeoObject.geometry.getCoordinates(),
                    bounds = firstGeoObject.properties.get('boundedBy');
                myMap.geoObjects.add(firstGeoObject);
                myMap.setBounds(bounds, {
                    checkZoomRange: true
                });
            });
    }
}
$(document).ready(function() {
    $('.pay_input').autoNumeric('init', {
        aSep: '',
        aSign: 'a',
        pSign: 's',
        aPad: false
    });
    $('.pay_input').autoNumeric('set', 1000);

    if ($('#main_map').length) {
        initialize();
        codeAddress();
    }

    var popup = $(".popup_bg");
    $(".edit_btn").on("click", function () {
       popup.show();
        return false;
    });
    $(".popup_btn .close").on("click", function () {
       if (!$(this).hasClass("disable")) {
           popup.hide();
           return false;
       }
    });
    $(window).load( function () {
        var max_height_col = 0;
        var column = $(".main > .column");
        column.each(function () {
            if ( max_height_col < $(this).height()) max_height_col = $(this).height();
        });
        column.each(function (index) {
            var shift = max_height_col - $(this).height();
            console.log("shift" + shift);
            if ( shift != 0) {
                if (index == 0) change_margin($(".address_block"), shift);
                if (index == 1) change_margin($(".sponsor"), shift);
                if (index == 2) change_margin($(".group_block"), shift);
            }
        });
        function change_margin (elem, shift) {
            elem.css("margin-top", parseInt(elem.prev().css("margin-bottom"))+shift);
        }
    });
});