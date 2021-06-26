import { YmapsRequiredError } from './YmapsError';

export async function getAddressFromCoords(coords) {
  if (!window.ymaps) {
    throw new YmapsRequiredError();
  }
  const res = await ymaps.geocode(coords, { results: 1 });
  const firstGeoObject = res.geoObjects.get(0);
  const address = firstGeoObject.getAddressLine();
  return address;
}

export async function getCoordsFromAddress(address) {
  // const urlAddress = encodeURI(address);
  if (!window.ymaps) {
    throw new YmapsRequiredError();
  }
  const res = await ymaps.geocode(address, { results: 1 });
  const firstGeoObject = res.geoObjects.get(0);
  const coords = firstGeoObject.geometry.getCoordinates();
  return coords;
}
