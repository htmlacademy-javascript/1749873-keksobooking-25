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
  return popupAdElement;
}

function adSuccesMessage(){
  const succesMessage = successMessageTemplate.cloneNode(true);
  document.body.append(succesMessage);
  deleteMessage('.success');
}

function adErrorMessage(){
  const errorMessage = errorMessageTemplate.cloneNode(true);
  document.body.append(errorMessage);
  deleteMessage('.error');
}

function adErrorLoadMessage(){
  const errorMessage = errorMessageTemplate.cloneNode(true);
  errorMessage.querySelector('.error__message').textContent = 'Ошибка загрузки данных!';
  errorMessage.querySelector('.error__button').textContent = 'Закрыть';
  document.body.append(errorMessage);
  deleteMessage('.error');
}

function deleteMessage(selector){
  const message = document.querySelector(selector);
  document.addEventListener('click', ()=>{
    message.remove();
  });
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      message.remove();
    }
  });
  if(selector==='.error'){
    const errorButton = document.querySelector('button[type=button]');
    errorButton.addEventListener('click', ()=>{
      message.remove();
    });
  }
}

export {createAd, adErrorMessage, adSuccesMessage, adErrorLoadMessage};
