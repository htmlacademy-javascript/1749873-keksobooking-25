import {adFormMapFiltersActive, adFormMapFiltersDisabled} from './form.js';
import {getUserAds} from './data.js';
import {createAd} from './template.js';

const resetButton = document.querySelector('.ad-form__reset');
const adressAdForm = document.querySelector('#address');
const mapLat = 35.68172;
const mapLng = 139.75392;

const userAdsForMap = getUserAds(10);
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
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});
const otherMapIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [50, 50],
  iconAnchor: [25, 50],
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

});

userAdsForMap.forEach(({author, offer, location}) => {
  const marker = L.marker({
    lat:location.lat,
    lng:location.lng,
  },
  {
    icon: otherMapIcon,
  });

  marker.addTo(map).bindPopup(createAd({author, offer}));
});


