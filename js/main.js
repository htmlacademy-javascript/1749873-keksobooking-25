function getRandomNumber(firstNumber, secondNumber){
  if(firstNumber>=secondNumber){
    return 'Число «до» должно быть меньшее, чем число «от», или равное ему';
  }
  firstNumber = Math.ceil(firstNumber);
  secondNumber = Math.floor(secondNumber);
  return Math.floor(Math.random() * (secondNumber - firstNumber + 1)) + firstNumber;
}

getRandomNumber(50,100);

function getRandomCoordinate(firstNumber, secondNumber, quantity){
    
   const coordinate = (Math.random() * (secondNumber - firstNumber)) + firstNumber;
   const main = String(coordinate).split('.');
   return `${main[0] }.${ main[1].substring(0, quantity)}`;
   
}

// eslint-disable-next-line no-alert
alert(getRandomCoordinate(1.25, 1.3, 3));
