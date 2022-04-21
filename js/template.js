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
const isEscapeKey = (evt) => evt.key === 'Escape';

function createAd({offer, author}){
  const popupAdElement = popupAdTemplate.cloneNode(true);
  if(offer.title){
    popupAdElement.querySelector('.popup__title').textContent = offer.title;
  }else{
    popupAdElement.querySelector('.popup__title').classList.add('hidden');
  }
  if(offer.address){
    popupAdElement.querySelector('.popup__text--address').textContent = offer.address;
  }else{
    popupAdElement.querySelector('.popup__text--address').classList.add('hidden');
  }
  if(offer.price){
    popupAdElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  }else{
    popupAdElement.querySelector('.popup__text--price').classList.add('hidden');
  }
  if(offer.type){
    popupAdElement.querySelector('.popup__type').textContent = housingTypes[offer.type];
  }else{
    popupAdElement.querySelector('.popup__type').classList.add('hidden');
  }
  if(offer.rooms){
    popupAdElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${offer.rooms=== 1 ? 'комната' : 'комнаты'} для ${offer.guests} ${offer.guests=== 1 ? 'гостя' : 'гостей'}`;
  }else{
    popupAdElement.querySelector('.popup__text--capacity').classList.add('hidden');
  }
  if(offer.checkin){
    popupAdElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  }else{
    popupAdElement.querySelector('.popup__text--time').classList.add('hidden');
  }
  if(author.avatar){
    popupAdElement.querySelector('.popup__avatar').src = author.avatar;
  }else{
    popupAdElement.querySelector('.popup__avatar').classList.add('hidden');
  }
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

const errorMessage = errorMessageTemplate.cloneNode(true);

const errorLoadMessage = errorMessageTemplate.cloneNode(true);
errorLoadMessage.classList.add('error-load-message');
errorLoadMessage.querySelector('.error__message').textContent = 'Ошибка загрузки данных!';
errorLoadMessage.querySelector('.error__button').textContent = 'Закрыть';


function adSuccesMessage(){
  document.body.append(succesMessage);
  succesMessage.classList.remove('hidden');
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', closeSuccessMessage);
}

function adErrorMessage(){
  document.body.append(errorMessage);
  errorMessage.classList.remove('hidden');
  document.addEventListener('keydown',onEscKeydown);
  document.addEventListener('click', closeErrorMessage);
}

function adErrorLoadMessage(){
  document.body.append(errorLoadMessage);
  errorLoadMessage.classList.remove('hidden');
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', closeErrorLoadMessage);
}

function onEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    closeErrorMessage();
    closeSuccessMessage();
    closeErrorLoadMessage();
  }
}

function closeErrorMessage(){
  errorMessage.classList.add('hidden');
  unblockSubmitButton();
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', closeErrorMessage);
}

function closeErrorLoadMessage(){
  errorLoadMessage.classList.add('hidden');
  unblockSubmitButton();
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', closeErrorLoadMessage);
}

function closeSuccessMessage () {
  succesMessage.classList.add('hidden');
  unblockSubmitButton();
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', closeSuccessMessage);
}

export {createAd, adErrorMessage, adSuccesMessage, adErrorLoadMessage};
