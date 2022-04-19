const adForm = document.querySelector('.ad-form');
const adFormElements = document.querySelectorAll('.ad-form__element');
const mapFiltersElements = document.querySelectorAll('.map__filter');
const mapFiltersFeatures = document.querySelector('.map__features');
const mapFilters = document.querySelector('.map__filters');

function adFormDisabled (){
  adForm.classList.add('ad-form--disabled');
  adFormElements.forEach((element) => {
    element.classList.add('disabled');
  });
}
function mapFiltersDisabled (){
  mapFilters.classList.add('map__filters--disabled');
  mapFiltersFeatures.classList.add('disabled');
  mapFiltersElements.forEach((element) => {
    element.classList.add('disabled');
  });
}
adFormDisabled();
mapFiltersDisabled();
