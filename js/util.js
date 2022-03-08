import {HOUSING_TYPES, IN_OUT_TIMES, FEATURES, HOUSING_PHOTOS, LATITUDE_MIN, LATITUDE_MAX, LONGITUDE_MIN, LONGITUDE_MAX, IMAGE_QUANTITY} from './data.js';
import {getRandomInt, getRandomElement, getRandomValue} from './support.js';

function createRandomAvatar() {
  const int = `${getRandomInt(1, IMAGE_QUANTITY)}.png`;
  const avatar = int.padStart(22, 'img/avatars/user0');
  return avatar;
}

function createLocation() {
  return ({
    lat: getRandomInt(LATITUDE_MIN, LATITUDE_MAX, 5),
    lng: getRandomInt(LONGITUDE_MIN, LONGITUDE_MAX, 5),
  });
}
function createAdressString(adress) {
  return `${adress.lat}, ${adress.lng}`;
}
function createAutor() {
  return ({
    avatar: createRandomAvatar(),
  });
}
function createOffer() {
  return ({
    title: 'Объявление',
    address: createAdressString(createLocation()),
    price: getRandomInt(100, 500),
    type: getRandomElement(HOUSING_TYPES),
    rooms: getRandomInt(1, 10),
    guests: getRandomInt(1, 10),
    checkin: getRandomElement(IN_OUT_TIMES),
    checkout: getRandomElement(IN_OUT_TIMES),
    features: getRandomValue(FEATURES),
    description: 'description',
    photos: getRandomValue(HOUSING_PHOTOS),
  });
}

function createAds() {
  return (
    {
      author: createAutor(),
      offer: createOffer(),
      location: createLocation(),
    });
}
export{createAds};
