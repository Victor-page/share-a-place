export function initMap(coordinates, type) {
  this.map = new ymaps.Map('map', {
    center: [55.76, 37.64],
    zoom: 16,
  });
  this.map.setCenter(coordinates);
  let iconType, preset;
  if (type === 'locate-user') {
    iconType = {
      balloonContent: 'Marker',
      iconCaption: 'My Current Location',
    };
    preset = {
      preset: 'islands#greenDotIconWithCaption',
      iconColor: '#36007c',
    };
  } else if (type === 'found-address') {
    iconType = {
      balloonContent: 'Found Place',
      iconCaption: 'Over Here',
    };
    preset = {
      preset: 'islands#circleDotIcon',
      iconColor: '#36007c',
    };
  }

  this.map.geoObjects.add(new ymaps.Placemark(coordinates, iconType, preset));
}
