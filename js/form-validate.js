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
let minPrice =0;

const pristine =  new Pristine(adForm,{
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element__error-text',

});
function validateTitle(value){
  return value.length >=MIN_LENGTH_TITLE &&  value.length <=MAX_LENGTH_TITLE ;
}
function setMinprice(value){
  switch (value) {
    case 'bungalow':
      minPrice =0;
      return minPrice;
    case 'flat':
      minPrice =1000;
      return minPrice;
    case 'hotel':
      minPrice =3000;
      return minPrice;
    case 'house':
      minPrice =5000;
      return minPrice;
    case 'palace':
      minPrice =10000;
      return minPrice;
    default:
      return minPrice;
  }
}
const adFormtType = adForm.querySelector('#type');
adFormtType.addEventListener('change', (evt)=>{
  adFormPrice.placeholder = setMinprice(evt.target.value);
  setMinprice(evt.target.value);
});
function validatePrice(value){
  return  value >minPrice && value <= MAX_PRICE;

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

pristine.addValidator(adFormTitle, validateTitle, `Обязательное поле! Длина от ${MIN_LENGTH_TITLE} до ${MAX_LENGTH_TITLE} символов` );

pristine.addValidator(adFormPrice, validatePrice, getPriceErrorText );
pristine.addValidator(adFormCapacity, validateRoomNumber);
pristine.addValidator(adFormRoomNumber, validateRoomNumber, getRoomNumberErrorText);
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
export {adForm};
