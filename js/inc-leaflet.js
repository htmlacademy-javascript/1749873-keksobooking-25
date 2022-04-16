import {createAd, adErrorLoadMessage} from './template.js';
import {getAds} from './load.js';
import {adFormMapFiltersActive} from './form.js';

const adressAdForm = document.querySelector('#address');
const filterForm = document.querySelector('.map__filters');
const timeoutDelay = 500;
const mapLat = 35.68172;
const mapLng = 139.75392;
const DEFAULT_VALUE = 'any';
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const MapIcon = {
  mainUrl : './img/main-pin.svg',
  mainSize: [52, 52],
  mainAnchor: [26, 52],
  otherUrl: './img/pin.svg',
  otherSize: [40, 40],
  otherAnchor: [20, 40],
};
const ADS_COUNT = 10;

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
    lat: mapLat,
    lng: mapLng,
  },
  {
    draggable: true,
    icon: mainMapIcon,
  },
);
mainMapMarker.addTo(map);

adressAdForm.value = `широта - ${mainMapMarker.getLatLng().lat},  долгота - ${mainMapMarker.getLatLng().lng}`;

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
function checkType(element){
  const mapFilterType = document.querySelector('#housing-type');
  return element.offer.type === mapFilterType.value || mapFilterType.value === DEFAULT_VALUE;
}
function checkRooms(element){
  const mapFilterRooms = document.querySelector('#housing-rooms');
  return element.offer.rooms === Number(mapFilterRooms.value) || mapFilterRooms.value=== DEFAULT_VALUE;
}
function checkGuests(element){
  const mapFilterGuests = document.querySelector('#housing-guests');
  return mapFilterGuests.value === DEFAULT_VALUE ? true : parseInt(mapFilterGuests.value, 10) <= element.offer.guests;
}
function checkPrice (element){
  const mapPrice = document.querySelector('#housing-price');
  switch (mapPrice.value) {
    case DEFAULT_VALUE:
      return true;
    case 'low':
      return element.offer.price < LOW_PRICE;
    case 'middle':
      return element.offer.price >= LOW_PRICE && element.offer.price < HIGH_PRICE;
    case 'high':
      return element.offer.price >= HIGH_PRICE;
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
function getUserFeatures(){
  const userFeatures=[];
  const features = document.querySelectorAll('[name="features"]:checked');
  features.forEach((elem)=>{
    userFeatures.push(elem.value);
  });
  return userFeatures;
}

function getComfortLevelAds(ad){
  let comfortLevel = 0;
  if(ad.offer.features){
    const userFeatures = getUserFeatures();
    userFeatures.forEach((feature)=>{
      if(ad.offer.features.includes(feature)){
        comfortLevel++;
      }
    });
  }
  return comfortLevel;
}

function compareAds(adFirst, adSecond){
  const levelFirst = getComfortLevelAds(adFirst);
  const levelSecond = getComfortLevelAds(adSecond);
  return levelSecond - levelFirst;
}

function getFilters (ads){
  const filteredAds = ads.slice().sort(compareAds).filter((ad)=>(
    checkType(ad)
    &&checkRooms(ad)
    &&checkPrice(ad)
    &&checkGuests(ad)));
  return filteredAds;
}

function onFilterChange (ads){
  return debounce(()=>{
    const filteredAds = getFilters(ads);
    markerGroup.clearLayers();
    createLayer(filteredAds);
  }, timeoutDelay);
}

function setFilter(ads){
  filterForm.addEventListener('change', onFilterChange(ads));
}
function createLayer (ads){
  ads.slice(0, ADS_COUNT).forEach((ad)=>{createMarker(ad);});
  adFormMapFiltersActive();
}


getAds((ads)=>{createLayer(ads); setFilter(ads);
}, adErrorLoadMessage);

export{resetMap};
