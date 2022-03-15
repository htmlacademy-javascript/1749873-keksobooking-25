import {getRandomInt, getRandomElement, getRandomValue} from './support.js';
const HOUSING_TYPES =['palace', 'flat', 'house', 'bungalow', 'hotel'];
const IN_OUT_TIMES =['12:00', '13:00', '14:00'];
const FEATURES =['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const HOUSING_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const LATITUDE_MIN =35.65000 ;
const LATITUDE_MAX =35.70000 ;
const LONGITUDE_MIN = 139.70000;
const LONGITUDE_MAX = 139.80000;
const IMAGE_QUANTITY = 10;
const HOUSING_TYPESRU ={
  flat:'Квартира',
  bungalow:'Бунгало',
  house:'Дом',
  palace:'Дворец',
  hotel:'Отель',
};


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
    title: `Объявление ${ getRandomInt(1,10)}`,
    address: createAdressString(createLocation()),
    price: getRandomInt(500, 1500),
    type: HOUSING_TYPESRU[getRandomElement(HOUSING_TYPES)],
    rooms:getRandomInt(1, 10),
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
};

const getArrayAds = (count)=>Array.from({length: count}, createAds);
export{getArrayAds};
