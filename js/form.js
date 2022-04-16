import {priceSlider, resetSlider} from './inc-nouislider.js';
import {resetMap} from './inc-leaflet.js';

const adForm = document.querySelector('.ad-form');
const resetButton = document.querySelector('.ad-form__reset');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFilterElements = document.querySelectorAll('.map__filter');
const mapFilterFeatures=  document.querySelector('.map__features');
const mapFilterForm = document.querySelector('.map__filters');
const adFormTimeIn = adForm.querySelector('#timein');
const adFormTimeOut = adForm.querySelector('#timeout');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const imagesPreview = document.querySelector('.ad-form__photo');

function adFormMapFiltersDisabled (){
  adForm.classList.add('ad-form--disabled');
  adFormElements.forEach((element) => {
    element.setAttribute('disabled', true);
  });
  mapFilterFeatures.setAttribute('disabled', true);
  mapFilterElements.forEach((element) => {
    element.setAttribute('disabled', true);
  });
  priceSlider.setAttribute('disabled', true);
}

function adFormMapFiltersActivate (){
  adForm.classList.remove('ad-form--disabled');
  adFormElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
  mapFilterFeatures.removeAttribute('disabled');
  mapFilterElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
  priceSlider.removeAttribute('disabled');
}

adFormTimeIn.addEventListener('change', ()=>{
  adFormTimeOut.value=adFormTimeIn.value;
});

adFormTimeOut.addEventListener('change', ()=>{
  adFormTimeIn.value=adFormTimeOut.value;
});

function resetFormMap(){
  adForm.reset();
  mapFilterForm.reset();
  resetMap();
  resetSlider();
  imagesPreview.innerHTML='';
  avatarPreview.src = 'img/muffin-grey.svg';
}

resetButton.addEventListener('click', ()=>{
  resetFormMap();
});

export {adFormMapFiltersActivate, adFormMapFiltersDisabled, resetFormMap};
