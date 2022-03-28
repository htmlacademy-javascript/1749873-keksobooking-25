import {priceSlider} from './inc-nouislider.js';
import {adForm} from './form-validate.js';
// //////////////////////////включение и отключение форм////////////////////////

const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFiltersElements = document.querySelectorAll('.map__filter');
const mapFiltersFeatures=  document.querySelector('.map__features');
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
///синхронизация времени выезда и заезда
const adFormtimein = adForm.querySelector('#timein');
const adFormtimeout = adForm.querySelector('#timeout');

adFormtimein.addEventListener('change', ()=>{
  adFormtimeout.value=adFormtimein.value;
});
adFormtimeout.addEventListener('change', ()=>{
  adFormtimein.value=adFormtimeout.value;
});

export {adFormMapFiltersActive ,adFormMapFiltersDisabled};

