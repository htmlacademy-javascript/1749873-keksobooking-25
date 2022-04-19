import {mapFiltersActivate, unblockSubmitButton} from './form.js';

const housingTypes = {
  'bungalow':'Бунгало',
  'flat':'Квартира',
  'hotel':'Отель',
  'house':'Дом',
  'palace':'Дворец'
};
const popupAdTemplate = document.querySelector('#card').content.querySelector('.popup');
const successMessageTemplate=document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate=document.querySelector('#error').content.querySelector('.error');
const isEscapeKey = (evt) => evt.key === 'Escape'|| evt.keyCode === 27;
// evt.key === 'Escape'||
function createAd({offer, author}){
  const popupAdElement = popupAdTemplate.cloneNode(true);
  popupAdElement.querySelector('.popup__title').textContent = offer.title;
  popupAdElement.querySelector('.popup__text--address').textContent = offer.address;
  popupAdElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  popupAdElement.querySelector('.popup__type').textContent =housingTypes[offer.type];
  popupAdElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${offer.rooms=== 1 ? 'комната' : 'комнаты'} для ${offer.guests} ${offer.guests=== 1 ? 'гостя' : 'гостей'}`;
  popupAdElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  popupAdElement.querySelector('.popup__avatar').src = author.avatar;
  const adFeatures = popupAdElement.querySelectorAll('.popup__feature');
  if(offer.features){
    const modifiers = offer.features.map((feature)=> `popup__feature--${feature}`);
    adFeatures.forEach((adFeaturesElement)=>{
      const modifier = adFeaturesElement.classList[1];
      if(!modifiers.includes(modifier)){
        adFeaturesElement.remove();
      }
    });
  }else{
    popupAdElement.querySelector('.popup__features').classList.add('hidden');
  }
  if(offer.description){
    popupAdElement.querySelector('.popup__description').textContent = offer.description;
  }else{
    popupAdElement.querySelector('.popup__description').classList.add('hidden');
  }
  const userAdImageContainer = popupAdElement.querySelector('.popup__photos');
  if(offer.photos){
    const userAdImage =  popupAdElement.querySelector('.popup__photo');
    userAdImageContainer.innerHTML = '';
    offer.photos.forEach((userPhoto)=>{
      const userAdImageElement = userAdImage.cloneNode(true);
      userAdImageElement.src = userPhoto;
      userAdImageContainer.append(userAdImageElement);
    });
  }else{
    userAdImageContainer.classList.add('hidden');
  }
  mapFiltersActivate();
  return popupAdElement;
}

const succesMessage = successMessageTemplate.cloneNode(true);
succesMessage.classList.add('hidden');
document.body.append(succesMessage);
const errorMessage = errorMessageTemplate.cloneNode(true);
errorMessage.classList.add('hidden');
document.body.append(errorMessage);
const errorLoadMessage = errorMessage;
errorMessage.querySelector('.error__message').textContent = 'Ошибка загрузки данных!';
errorMessage.querySelector('.error__button').textContent = 'Закрыть';
errorLoadMessage.classList.add('hidden');
document.body.append(errorLoadMessage);

function adSuccesMessage(){
  succesMessage.classList.remove('hidden');
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', closeSuccessMessage);
}

function adErrorMessage(){
  errorMessage.classList.remove('hidden');
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', closeErrorMessage);
}

function adErrorLoadMessage(){
  errorLoadMessage.classList.remove('hidden');
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', closeErrorMessage);
}

function onEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorMessage();
    closeSuccessMessage();
  }
}

function closeErrorMessage(){
  errorMessage.classList.add('hidden');
  unblockSubmitButton();
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', closeErrorMessage);
}

function closeSuccessMessage () {
  succesMessage.classList.add('hidden');
  unblockSubmitButton();
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', closeSuccessMessage);
}

export {createAd, adErrorMessage, adSuccesMessage, adErrorLoadMessage};
