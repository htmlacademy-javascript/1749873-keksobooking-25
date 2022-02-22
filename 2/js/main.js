function printWarningRandom(callback){
  if(callback){
    return 'Вводимое значение должно быть болше либо равно 0';
  }
  return 'Число «от» должно быть меньшее, чем число «до» ';

}

function getRandomNumber(firstNumber, secondNumber){
  if(firstNumber<0 || secondNumber<0){
    return printWarningRandom(1);
  }
  if(secondNumber<=firstNumber){
    return printWarningRandom();
  }
  firstNumber = Math.ceil(firstNumber);
  secondNumber = Math.floor(secondNumber);
  return Math.floor(Math.random() * (secondNumber - firstNumber + 1)) + firstNumber;
}

function getRandomCoordinate(firstNumber, secondNumber, quantity){
  if(firstNumber<0 || secondNumber<0){
    return printWarningRandom(1);
  }
  if(secondNumber<=firstNumber){
    return printWarningRandom();
  }
  const coordinate = (Math.random() * (secondNumber - firstNumber)) + firstNumber;
  let result = String(coordinate).split('.');
  result = `${result[0] }.${ result[1].substring(0, quantity)}`;
  return Number(result);

}

// Примеры и методы взяты с ссайта developer.mozilla.org
getRandomCoordinate(110, 100.3, 3);

getRandomNumber(100,100);
