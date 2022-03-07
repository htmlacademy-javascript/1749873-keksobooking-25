import {DATA_TYPES, DATA_TIMES, DATA_FEATURES, DATA_PHOTOS} from './data.js';

function getRandomInt(from, to, quantity = 0){
  const max = Math.max(Math.abs(from), Math.abs(to));
  const min = Math.min(Math.abs(from), Math.abs(to));
  const result = (Math.random() * (max - min) + min).toFixed(quantity);
  return +result ;
}
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
export{createAds};
