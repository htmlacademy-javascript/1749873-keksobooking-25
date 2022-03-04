//функция генерации числа
function getRandomInt(from, to, quantity = 0){
  const max = Math.max(Math.abs(from), Math.abs(to));
  const min = Math.min(Math.abs(from), Math.abs(to));
  const result = (Math.random() * (max - min) + min).toFixed(quantity);
  return +result ;
}

// Примеры и методы взяты с сайта developer.mozilla.org

const DATA_TYPES =['palace', 'flat', 'house', 'bungalow', 'hotel'];
const DATA_TIMES =['12:00', '13:00', '14:00'];
const DATA_FEATURES =['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DATA_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const getRandomAvatar = ()=>{
  const int = +getRandomInt(0,9) +1;
  if(int===10){
    return `img/avatars/user${int}.png`;
  }
  return `img/avatars/user0${int}.png`;
};
const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];


const getArrayStrings =(array) => {
  const features = array.sort(()=>Math.random()-0.5);

  return features.slice(0, getRandomInt(1,array.length+1));
};

const createLocation = ()=>({
  lat:getRandomInt(35.65000, 35.70000, 5),
  lng:getRandomInt(139.70000, 139.80000, 5),
});
const getAdressString = ()=>{
  const adress = createLocation();
  return `${adress.lat}, ${adress.lng}`;
};
const createAutor = ()=>({
  avatar:getRandomAvatar(),
});
const createOffer = ()=>({
  title:'Объявление',
  address: getAdressString(),
  price:getRandomInt(100,500),
  type: getRandomArrayElement(DATA_TYPES),
  rooms:getRandomInt(1,10),
  guests:getRandomInt(1,10),
  checkin:getRandomArrayElement(DATA_TIMES),
  checkout:getRandomArrayElement(DATA_TIMES),
  features:getArrayStrings(DATA_FEATURES),
  description:'description',
  photos:getArrayStrings(DATA_PHOTOS),
});

const createAds = ()=>(
  { author:createAutor(),
    offer: createOffer(),
    location: createLocation(),
  });

const getArrayAds = Array.from({length: 10}, createAds);
// eslint-disable-next-line no-console
console.log(getArrayAds);

