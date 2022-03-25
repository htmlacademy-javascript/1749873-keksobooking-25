const adForm = document.querySelector('.ad-form');
const adFormTitle = adForm.querySelector('#title');
const adFormPrice = adForm.querySelector('#price');
const adFormCapacity = adForm.querySelector('#capacity');
const adFormRoomNumber = adForm.querySelector('#room_number');
const adFormRoomNumberOption = {
  '1':['1'],
  '2': ['1','2'],
  '3': ['1','2','3'],
  '100':['0'],
};

const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const MAX_PRICE = 100000;
const MIN_PRICE = 0;
const mapFilters = document.querySelector('.map__filters');

const pristine =  new Pristine(adForm,{
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element__error-text',

});

function validateTitle(value){
  return value.length >=MIN_LENGTH_TITLE &&  value.length <=MAX_LENGTH_TITLE ;
}
function validatePrice(value){
  return  value >MIN_PRICE && value <= MAX_PRICE;

}
function getPriceErrorText(){
  if( adFormPrice.value===''){
    return 'Обязательное поле!';
  }

  return `Максимальная цена — ${MAX_PRICE}`;

}

function validateRoomNumber () {

  return adFormRoomNumberOption[adFormRoomNumber.value].includes(adFormCapacity.value);
}
function getRoomNumberErrorText(){
  return `${adFormRoomNumber.value} ${adFormRoomNumber.value==='1' ? 'комната' : 'комнаты'} только для ${adFormRoomNumber.value} ${adFormRoomNumber.value==='1' ? 'гостя' : 'гостей и менее!'} `;
}

pristine.addValidator(adFormTitle, validateTitle, `Обязательное поле! Длина от ${MIN_LENGTH_TITLE} до ${MAX_LENGTH_TITLE} символов` );

pristine.addValidator(adFormPrice, validatePrice, getPriceErrorText );
pristine.addValidator(adFormCapacity, validateRoomNumber);
pristine.addValidator(adFormRoomNumber, validateRoomNumber, getRoomNumberErrorText);
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

// //////////////////////////включение и отключение форм////////////////////////

const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFiltersElements = mapFilters.querySelectorAll('.map__filter');
const mapFiltersFeatures=  mapFilters.querySelector('.map__features');
function adFormMapFiltersDisabled (){
  adForm.classList.add('ad-form--disabled');

  adFormElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });

  mapFiltersFeatures.setAttribute('disabled', 'disabled');
  mapFiltersElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
  mapFilters.classList.add('map__filters--disabled');
}

function adFormMapFiltersActive (){
  adForm.classList.remove('ad-form--disabled');
  adFormElements.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });
  mapFiltersFeatures.removeAttribute('disabled', 'disabled');
  mapFiltersElements.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });
  mapFilters.classList.remove('map__filters--disabled');
}

adFormMapFiltersDisabled();
adFormMapFiltersActive();

