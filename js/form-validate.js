import {sendAds} from './load.js';
import {resetFormMap} from './form.js';

const adForm = document.querySelector('.ad-form');
const adFormTitle = adForm.querySelector('#title');
const adFormPrice = adForm.querySelector('#price');
const adFormCapacity = adForm.querySelector('#capacity');
const adFormRoomNumber = adForm.querySelector('#room_number');
const adFormtType = adForm.querySelector('#type');
const adFormRoomNumberOption = {
  '1':['1'],
  '2': ['1','2'],
  '3': ['1','2','3'],
  '100':['0'],
};
const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const MAX_PRICE = 100000;
const priceMap = {
  'bungalow':0,
  'flat':1000,
  'hotel':3000,
  'house':5000,
  'palace':10000
};
let minPrice =0;

const pristine =  new Pristine(adForm,{
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element__error-text',

});

function validateTitle(title){
  return title.length >=MIN_LENGTH_TITLE &&  title.length <=MAX_LENGTH_TITLE ;
}

adFormtType.addEventListener('change', ()=>{
  minPrice=priceMap[adFormtType.value];
  adFormPrice.placeholder = minPrice;
});

function validatePrice(price){
  return  price >minPrice && price <= MAX_PRICE;
}

function getPriceErrorText(){
  if( adFormPrice.value<minPrice){
    return `Минимальная цена - ${minPrice}`;
  }
  return `Максимальная цена — ${MAX_PRICE}`;
}

function validateRoomNumber () {
  return adFormRoomNumberOption[adFormRoomNumber.value].includes(adFormCapacity.value);
}

function getRoomNumberErrorText(){
  if(adFormRoomNumber.value==='100'){
    return `${adFormRoomNumber.value} комнат не для гостей`;
  }
  return `${adFormRoomNumber.value} ${adFormRoomNumber.value==='1' ? 'комната' : 'комнаты'} только для ${adFormRoomNumber.value} ${adFormRoomNumber.value==='1' ? 'гостя' : 'гостей и менее!'} `;
}

pristine.addValidator(adFormTitle, validateTitle, `Обязательное поле! Длина от ${MIN_LENGTH_TITLE} до ${MAX_LENGTH_TITLE} символов`);

pristine.addValidator(adFormPrice, validatePrice, getPriceErrorText );
pristine.addValidator(adFormCapacity, validateRoomNumber);
pristine.addValidator(adFormRoomNumber, validateRoomNumber, getRoomNumberErrorText);

function setFormSubmit(onSuccess, onFail){
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if(pristine.validate()){
      const formData = new FormData(evt.target);
      sendAds(() => {
        onSuccess();
        resetFormMap();}, onFail, formData);
    }
  });
}
export {setFormSubmit};
