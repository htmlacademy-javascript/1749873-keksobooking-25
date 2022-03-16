import {getArrayAds} from './data.js';

const popupAdsTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvasAd = document.querySelector('#map-canvas');


const userAds = getArrayAds(1);
userAds.forEach(({author, offer})=>{
  const popupAdsElement = popupAdsTemplate.cloneNode(true);
  popupAdsElement.querySelector('.popup__title').textContent = offer.title;
  popupAdsElement.querySelector('.popup__text--address').textContent = offer.address;
  popupAdsElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  popupAdsElement.querySelector('.popup__type').textContent =offer.type;
  popupAdsElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  popupAdsElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  popupAdsElement.querySelector('.popup__avatar').src = author.avatar;
  const adsFeaturesList = popupAdsElement.querySelectorAll('.popup__feature');
  adsFeaturesList.forEach((adsFeaturesItem)=>{
    const isNecessary = offer.features.some(
      (userAdsFeature)=> adsFeaturesItem.classList.contains(`popup__feature--${userAdsFeature}`)
    );
    if(!isNecessary){
      adsFeaturesItem.remove();
    }
  });
  popupAdsElement.querySelector('.popup__description').textContent =  offer.description;
  const userAdsImagelist = popupAdsElement.querySelector('.popup__photos');
  const userAdsImage =  popupAdsElement.querySelector('.popup__photo');
  userAdsImagelist.innerHTML = '';
  offer.photos.forEach((userPhoto)=>{
    const userAdsImageItem = userAdsImage.cloneNode(true);
    userAdsImageItem.src = userPhoto;
    userAdsImagelist.append(userAdsImageItem);
  });
  mapCanvasAd.append(popupAdsElement);
});

