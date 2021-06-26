import { Map } from './UI/Map';

class LoadedPlace {
  constructor(coordinates, address, type) {
    new Map(coordinates, type);
    const headerTitleEl = document.querySelector('header h1');
    headerTitleEl.textContent = address;
  }
}

const url = new URL(location.href);
const queryParams = url.searchParams;
const coords = [
  parseFloat(queryParams.get('lat')),
  parseFloat(queryParams.get('lng')),
];
const address = queryParams.get('address');
const type = queryParams.get('type');
new LoadedPlace(coords, address, type);
