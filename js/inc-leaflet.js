import {createAd, adErrorLoadMessage} from './template.js';
import {getAds} from './load.js';

const adressAdForm = document.querySelector('#address');
const mapLat = 35.68172;
const mapLng = 139.75392;


const map = L.map('map-canvas')
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

function resetMap(){
  mainMapMarker.setLatLng({
    lat: mapLat,
    lng: mapLng,
  });
  map.setView({
    lat: mapLat,
    lng: mapLng,
  }, 13);
  map.closePopup();
  adressAdForm.placeholder =`широта - ${mapLat},  долгота - ${mapLng}`;
}

const markerGroup = L.layerGroup().addTo(map);

function createAdMap(ads){
  ads.forEach((ad) => {
    const marker = L.marker({
      lat:ad.location.lat,
      lng:ad.location.lng,
    },
    {
      icon: otherMapIcon,
    });
    marker.addTo(markerGroup).bindPopup(createAd(ad));
  });
}

getAds(createAdMap, adErrorLoadMessage);

export{resetMap};
