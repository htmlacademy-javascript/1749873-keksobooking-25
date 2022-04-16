const adForm = document.querySelector('.ad-form');
const adFormElements = document.querySelectorAll('.ad-form__element');
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

}
adFormMapFiltersDisabled();
