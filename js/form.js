import {priceSlider, resetSlider} from './inc-nouislider.js';

const adForm = document.querySelector('.ad-form');
const resetButton = adForm.querySelector('.ad-form__reset');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFilter = document.querySelector('.map__filters');
const mapFilterElements = mapFilter.querySelectorAll('.map__filter');
const mapFilterFeatures=  mapFilter.querySelector('.map__features');
const adFormTimeIn = adForm.querySelector('#timein');
const adFormTimeOut = adForm.querySelector('#timeout');
const avatarPreview = adForm.querySelector('.ad-form-header__preview img');
const imagesPreview = adForm.querySelector('.ad-form__photo');
const submitButton = adForm.querySelector('.ad-form__submit');

function adFormActivate (){
  adForm.classList.remove('ad-form--disabled');
  adFormElements.forEach((element) => {
    element.classList.remove('disabled');
  });
  priceSlider.classList.remove('disabled');
}
function mapFiltersActivate (){
  mapFilterFeatures.classList.remove('disabled');
  mapFilterElements.forEach((element) => {
    element.classList.remove('disabled');
  });
  mapFilter.classList.remove('map__filters--disabled');
}

adFormTimeIn.addEventListener('change', ()=>{
  adFormTimeOut.value=adFormTimeIn.value;
});

adFormTimeOut.addEventListener('change', ()=>{
  adFormTimeIn.value=adFormTimeOut.value;
});

function resetFormMap(){
  adForm.reset();
  mapFilter.reset();
  resetSlider();
  imagesPreview.innerHTML='';
  avatarPreview.src = 'img/muffin-grey.svg';
}


resetButton.addEventListener('click', (evt)=>{
  evt.preventDefault();
  resetFormMap();
});

const blockSubmitButton = () => {
  submitButton.classList.add('disabled');
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.classList.remove('disabled');
  submitButton.textContent = 'Опубликовать';
};

export {resetFormMap, adFormActivate, unblockSubmitButton, blockSubmitButton, mapFiltersActivate};
