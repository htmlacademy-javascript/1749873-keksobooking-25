import {getUserAds} from './data.js';

const popupAdsTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvasAd = document.querySelector('#map-canvas');


const userAds = getUserAds(1);
userAds.forEach(({author, offer})=>{
  const popupAdsElement = popupAdsTemplate.cloneNode(true);
  popupAdsElement.querySelector('.popup__title').textContent = offer.title;
  popupAdsElement.querySelector('.popup__text--address').textContent = offer.address;
  popupAdsElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  popupAdsElement.querySelector('.popup__type').textContent =offer.type;
  popupAdsElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  popupAdsElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  popupAdsElement.querySelector('.popup__avatar').src = author.avatar;
  const adsFeatures = popupAdsElement.querySelectorAll('.popup__feature');
  const modifiers = offer.features.map((userAdsFeature)=> `popup__feature--${userAdsFeature}`);
  adsFeatures.forEach((adsFeaturesElement)=>{
    const modifier = adsFeaturesElement.classList[1];
    if(!modifiers.includes(modifier)){
      adsFeaturesElement.remove();
    }
  });
  popupAdsElement.querySelector('.popup__description').textContent =  offer.description;
  const userAdsImageContainer = popupAdsElement.querySelector('.popup__photos');
  const userAdsImage =  popupAdsElement.querySelector('.popup__photo');
  userAdsImageContainer.innerHTML = '';
  offer.photos.forEach((userPhoto)=>{
    const userAdsImageElement = userAdsImage.cloneNode(true);
    userAdsImageElement.src = userPhoto;
    userAdsImageContainer.append(userAdsImageElement);
  });
  mapCanvasAd.append(popupAdsElement);
});


