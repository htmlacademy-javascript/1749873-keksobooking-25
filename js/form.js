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

const pristine =  new Pristine(adForm,{
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element__error-text',
}, false);

function validateTitle(value){
  return value.length >=30 &&  value.length <= 100;
}
function validatePrice(value){
  return  value >0 && value <= 100000;
}
function getPriceErrorText(){
  if( adFormPrice.value===''){
    return 'Обязательное поле!';
  }
  return 'Максимальная цена — 100000';
}

function validateRoomNumber () {

  return adFormRoomNumberOption[adFormRoomNumber.value].includes(adFormCapacity.value);
}
function getRoomNumberErrorText(){
  return `${adFormRoomNumber.value} ${adFormRoomNumber.value==='1' ? 'комната' : 'комнаты'} только для ${adFormRoomNumber.value} ${adFormRoomNumber.value==='1' ? 'гостя' : 'гостей и менее!'} `;
}

pristine.addValidator(adFormTitle, validateTitle, 'Обязательное поле! Длина от 30 до 100 символов' );
pristine.addValidator(adFormPrice, validatePrice, getPriceErrorText );
pristine.addValidator(adFormCapacity, validateRoomNumber);
pristine.addValidator(adFormRoomNumber, validateRoomNumber, getRoomNumberErrorText);
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
