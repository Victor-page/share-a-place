import { initMap } from '../Utility/Init';

export class Map {
  constructor(coords, type) {
    this.render(coords, type);
  }

  removeWarningTextElement() {
    const warningTextElement = document.querySelector('#map > p');
    warningTextElement && warningTextElement.remove();
  }

  render(coordinates, type) {
    if (this.map) {
      this.map.destroy();
      this.map = null;
    }
    this.removeWarningTextElement();
    ymaps.ready(initMap.bind(this, coordinates, type));
  }
}
