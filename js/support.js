function getRandomInt(from, to, quantity = 0){
  const max = Math.max(Math.abs(from), Math.abs(to));
  const min = Math.min(Math.abs(from), Math.abs(to));
  const result = (Math.random() * (max - min) + min).toFixed(quantity);
  return +result ;
}

function getRandomElement(elements) {
  return elements[getRandomInt(0, elements.length - 1)];
}

function getRandomValue(values) {
  const newValues = values.sort(() => Math.random() - 0.5);
  return newValues.slice(0, getRandomInt(1, values.length + 1));
}

export{getRandomInt, getRandomElement, getRandomValue};
