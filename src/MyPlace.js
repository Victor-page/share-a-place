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
// const coords = [
//   parseFloat(queryParams.get('lat')),
//   parseFloat(queryParams.get('lng')),
// ];
// const address = queryParams.get('address');
// const type = queryParams.get('type');
const locId = queryParams.get('location');
fetch('https://share-place-deployment.herokuapp.com/location/' + locId)
  .then((response) => {
    if (response.status === 404) {
      throw new Error("Couldn't find location!");
    }
    if (response.status === 500) {
      throw new Error('Invalid id!');
    }
    return response.json();
  })
  .then((data) => {
    new LoadedPlace(data.coordinates, data.address, data.type);
  })
  .catch((error) => {
    alert(error.message);
  });
