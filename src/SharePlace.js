import { Modal } from './UI/Modal';
import { Map } from './UI/Map';
import { getCoordsFromAddress, getAddressFromCoords } from './Utility/Location';

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector('form');
    const locateUserBtn = document.getElementById('locate-btn');
    this.shareBtn = document.getElementById('share-btn');
    this.sharedLinkInputElement = document.getElementById('share-link');

    locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));
    this.shareBtn.addEventListener('click', this.sharePlaceHandler.bind(this));
    addressForm.addEventListener('submit', this.findAddressHandler.bind(this));
  }

  sharePlaceHandler() {
    if (!navigator.clipboard) {
      this.sharedLinkInputElement.select();
      return;
    }

    navigator.clipboard
      .writeText(this.sharedLinkInputElement.value)
      .then(() => {
        alert('Copied into clipboard!');
      })
      .catch((error) => {
        alert(error);
        this.sharedLinkInputElement.select();
      });
  }

  selectPlace(coordinates, type, address) {
    if (this.map) {
      this.map.render(coordinates, type);
    } else {
      this.map = new Map(coordinates, type);
    }
    this.shareBtn.disabled = false;
    this.sharedLinkInputElement.value = `${
      location.origin
    }/share-place/my-place?address=${encodeURI(address)}&lat=${
      coordinates[0]
    }&lng=${coordinates[1]}&type=${type}`;
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert(
        'Location feature is not available in your browser - please use a more modern browser or manually enter an address.'
      );
      return;
    }
    const modal = new Modal(
      'loading-modal-content',
      'Loading location - please wait!'
    );
    modal.show();
    navigator.geolocation.getCurrentPosition(
      async (successResult) => {
        const coordinates = [
          successResult.coords.latitude,
          successResult.coords.longitude,
        ];
        try {
          const address = await getAddressFromCoords(coordinates);
          this.selectPlace(coordinates, 'locate-user', address);
        } catch (error) {
          if (error.name === 'YmapsRequiredError') {
            alert(error.message);
          } else {
            alert(
              `Couldn't get your address from the coordinates unfortunately. Please enter an address manually! \nError message - ${error.message}`
            );
          }
        }
        modal.hide();
      },
      (error) => {
        modal.hide();
        alert(
          `Couldn't locate you unfortunately. Please enter an address manually! \nError message - ${error.message}`
        );
      }
    );
  }

  async findAddressHandler(event) {
    event.preventDefault();
    const address = event.target.querySelector('input').value;
    if (!address || address.trim().length === 0) {
      alert('Invalid address entered - please try again!');
      return;
    }
    const modal = new Modal(
      'loading-modal-content',
      'Loading location - please wait!'
    );
    modal.show();
    try {
      const coordinates = await getCoordsFromAddress(address);
      this.selectPlace(coordinates, 'found-address', address);
    } catch (error) {
      if (error.name === 'YmapsRequiredError') {
        alert(error.message);
      } else {
        alert(
          `Failed to fetch coordinates. Please try again! \nError message- ${error.message}`
        );
      }
    }
    modal.hide();
  }
}

const placeFinder = new PlaceFinder();
