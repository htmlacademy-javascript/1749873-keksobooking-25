const priceSlider = document.querySelector('.ad-form__slider');
const adFormPrice = document.querySelector('#price');

adFormPrice.value = 5000;

noUiSlider.create(priceSlider, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 5000,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },},
});

function resetSlider(){
  priceSlider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100000,
    },
    start: 5000,
    step: 1,
  });
}

priceSlider.noUiSlider.on('update', () => {
  adFormPrice.value = priceSlider.noUiSlider.get();
});

export {priceSlider,resetSlider};
