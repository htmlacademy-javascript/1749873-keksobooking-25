import {priceSlider, resetSlider} from './inc-nouislider.js';
import {resetMap} from './inc-leaflet.js';

const adForm = document.querySelector('.ad-form');
const resetButton = document.querySelector('.ad-form__reset');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFiltersElements = document.querySelectorAll('.map__filter');
const mapFiltersFeatures=  document.querySelector('.map__features');
const mapFilters = document.querySelector('.map__filters');

function adFormMapFiltersDisabled (){
  adForm.classList.add('ad-form--disabled');
  adFormElements.forEach((element) => {
    element.setAttribute('disabled', true);
  });
  mapFiltersFeatures.setAttribute('disabled', true);
  mapFiltersElements.forEach((element) => {
    element.setAttribute('disabled', true);
  });
  priceSlider.setAttribute('disabled', true);
}

function adFormMapFiltersActive (){
  adForm.classList.remove('ad-form--disabled');
  adFormElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
  mapFiltersFeatures.removeAttribute('disabled');
  mapFiltersElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
  priceSlider.removeAttribute('disabled');
}
///синхронизация времени выезда и заезда////
const adFormtimein = adForm.querySelector('#timein');
const adFormtimeout = adForm.querySelector('#timeout');

adFormtimein.addEventListener('change', ()=>{
  adFormtimeout.value=adFormtimein.value;
});

adFormtimeout.addEventListener('change', ()=>{
  adFormtimein.value=adFormtimeout.value;
});

// adFormMapFiltersDisabled();
function resetFormMap(){
  adForm.reset();
  mapFilters.reset();
  resetMap();
  resetSlider();
}
resetButton.addEventListener('click', ()=>{
  resetFormMap();
});
export {adFormMapFiltersActive, adFormMapFiltersDisabled, resetFormMap};
