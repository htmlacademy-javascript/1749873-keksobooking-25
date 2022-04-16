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

function adFormMapFiltersActive (){
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
// function setType(ads,cb){
//   mapFilterType.addEventListener('change', ()=>{
//     const type = mapFilterType.value;
//     function filterArr(){

//       if(type){
//         return ads.slice().filter((ad)=>ad.offer.type === type).slice(0, 10);
//       }
//       return ads.slice(0, 20);
//     }
//     console.log(filterArr());
//   });cb(filterArr());, setType
// }


function resetFormMap(){
  adForm.reset();
  mapFilterForm.reset();
  resetMap();
  resetSlider();
}

resetButton.addEventListener('click', ()=>{
  resetFormMap();
});

export {adFormMapFiltersActive, adFormMapFiltersDisabled, resetFormMap};
