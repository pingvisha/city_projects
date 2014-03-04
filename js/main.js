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
});