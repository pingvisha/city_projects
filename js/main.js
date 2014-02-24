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
});