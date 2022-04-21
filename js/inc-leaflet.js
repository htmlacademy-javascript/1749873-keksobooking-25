import {createAd, adErrorLoadMessage} from './template.js';
import {getAds} from './load.js';

const TIMEOUT_DELAY = 500;
const MAP_LAT = 35.68172;
const MAP_LNG = 139.75392;
const DEFAULT_VALUE = 'any';
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const ADS_COUNT = 10;

const resetButton = document.querySelector('.ad-form__reset');
const addressAdForm = document.querySelector('#address');
const filterForm = document.querySelector('.map__filters');
const MapIcon = {
  mainUrl : './img/main-pin.svg',
  mainSize: [52, 52],
  mainAnchor: [26, 52],
  otherUrl: './img/pin.svg',
  otherSize: [40, 40],
  otherAnchor: [20, 40],
};

const map = L.map('map-canvas');

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainMapIcon = L.icon({
  iconUrl: MapIcon.mainUrl,
  iconSize: MapIcon.mainSize,
  iconAnchor: MapIcon.mainAnchor,
});
const otherMapIcon = L.icon({
  iconUrl: MapIcon.otherUrl,
  iconSize: MapIcon.otherSize,
  iconAnchor: MapIcon.otherAnchor,
});
const mainMapMarker = L.marker(
  {
    lat: MAP_LAT,
    lng: MAP_LNG,
  },
  {
    draggable: true,
    icon: mainMapIcon,
  },
);
mainMapMarker.addTo(map);

addressAdForm.value =`${mainMapMarker.getLatLng().lat} ${mainMapMarker.getLatLng().lng}`;

function getAddressString(marker){
  const address = marker.getLatLng();
  return `${address.lat.toFixed(5)} ${address.lng.toFixed(5)}`;
}

mainMapMarker.on('moveend', (evt) => {
  addressAdForm.value = getAddressString(evt.target);
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (ad) => {
  const marker = L.marker(
    {
      lat:ad.location.lat,
      lng:ad.location.lng,
    },
    {
      icon: otherMapIcon,
    },
  );
  marker
    .addTo(markerGroup)
    .bindPopup(createAd(ad));
};

function checkType(ad){
  const mapFilterType = document.querySelector('#housing-type');
  return ad.offer.type === mapFilterType.value || mapFilterType.value === DEFAULT_VALUE;
}

function checkRooms(ad){
  const mapFilterRooms = document.querySelector('#housing-rooms');
  return ad.offer.rooms === Number(mapFilterRooms.value) || mapFilterRooms.value=== DEFAULT_VALUE;
}

function checkGuests(ad){
  const mapFilterGuests = document.querySelector('#housing-guests');
  return mapFilterGuests.value === DEFAULT_VALUE ? true : parseInt(mapFilterGuests.value, 10) === ad.offer.guests;
}

function checkPrice (ad){
  const mapPrice = document.querySelector('#housing-price');
  switch (mapPrice.value) {
    case DEFAULT_VALUE:
      return true;
    case 'low':
      return ad.offer.price < LOW_PRICE;
    case 'middle':
      return ad.offer.price >= LOW_PRICE && ad.offer.price < HIGH_PRICE;
    case 'high':
      return ad.offer.price >= HIGH_PRICE;
    default:
      return false;
  }
}

function debounce (callback, timeout) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeout);
  };
}

function checkFeatures(ad){
  let count = 0;
  const checkedFeatures = filterForm.querySelectorAll('[name="features"]:checked');
  if( ad.offer.features){
    checkedFeatures.forEach((feature) => {
      if (ad.offer.features.includes(feature.value)) {
        count++;
      }else{
        count = 0;
      }
    });
  }
  return count === checkedFeatures.length;
}

function getFilters (ads){
  const filteredAds=[];
  const filters=[checkType, checkRooms, checkPrice, checkGuests, checkFeatures];
  ads.forEach((ad)=>{
    if(filters.every((filter)=>filter(ad))) {
      if(filteredAds.length<=9){
        filteredAds.push(ad);
      }
    }
  });
  return filteredAds;
}

function onFilterChange (ads){
  return debounce(()=>{
    const filteredAds = getFilters(ads);
    markerGroup.clearLayers();
    createLayer(filteredAds);
  }, TIMEOUT_DELAY);
}

function setFilter(ads){
  filterForm.addEventListener('change', onFilterChange(ads));
}

function createLayer (ads){
  ads.slice(0, ADS_COUNT).forEach((ad)=>{createMarker(ad);});
}

function resetMap(ads){
  mainMapMarker.setLatLng({
    lat: MAP_LAT,
    lng: MAP_LNG,
  });
  map.setView({
    lat: MAP_LAT,
    lng: MAP_LNG,
  }, 13);
  map.closePopup();
  addressAdForm.value =`${mainMapMarker.getLatLng().lat} ${mainMapMarker.getLatLng().lng}`;
  addressAdForm.placeholder =`${mainMapMarker.getLatLng().lat} ${mainMapMarker.getLatLng().lng}`;
  markerGroup.clearLayers();
  createLayer(ads);
}

function onResetMapAdForms(ads){
  resetButton.addEventListener('click', (evt)=>{
    evt.preventDefault();
    resetMap(ads);
  });
}

function setMap(preInt){
  map.on('load', () => {
    preInt();
    getAds((ads)=>{createLayer(ads); setFilter(ads); onResetMapAdForms(ads);}, adErrorLoadMessage);
  }).setView({
    lat: MAP_LAT,
    lng: MAP_LNG,
  }, 13);
}

export{setMap, resetMap};
