import {adFormMapFiltersActive, adFormMapFiltersDisabled} from './form.js';

import {createAd} from './template.js';
import {createLoader} from './load.js';
const resetButton = document.querySelector('.ad-form__reset');
const adressAdForm = document.querySelector('#address');
const mapLat = 35.68172;
const mapLng = 139.75392;


adFormMapFiltersDisabled();

const map = L.map('map-canvas')
  .on('load', () => {
    adFormMapFiltersActive();
  })
  .setView({
    lat: mapLat,
    lng: mapLng,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainMapIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const otherMapIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
const mainMapMarker = L.marker(
  {
    lat: mapLat,
    lng: mapLng,
  },
  {
    draggable: true,
    icon: mainMapIcon,
  },
);

adressAdForm.value = `широта - ${mainMapMarker.getLatLng().lat},  долгота - ${mainMapMarker.getLatLng().lng}`;

mainMapMarker.addTo(map);

function getAdressString(marker){
  const adress = marker.getLatLng();
  return `широта - ${adress.lat.toFixed(5)},  долгота - ${adress.lng.toFixed(5)}`;
}

mainMapMarker.on('moveend', (evt) => {
  adressAdForm.value = getAdressString(evt.target);
});

resetButton.addEventListener('click', ()=>{
  mainMapMarker.setLatLng({
    lat: mapLat,
    lng: mapLng,
  });
  map.setView({
    lat: mapLat,
    lng: mapLng,
  }, 13);
  adressAdForm.placeholder =  `широта - ${mapLat},  долгота - ${mapLng}` ;
});
function createAdMap(ads){

  ads.forEach((ad) => {
    const marker = L.marker({
      lat:ad.location.lat,
      lng:ad.location.lng,
    },
    {
      icon: otherMapIcon,
    });
    marker.addTo(map).bindPopup(createAd(ad));
  });
}
const loaderMap = createLoader(createAdMap);
loaderMap();
