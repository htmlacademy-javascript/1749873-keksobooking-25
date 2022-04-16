const priceSlider = document.querySelector('.ad-form__slider');
const adFormPrice = document.querySelector('#price');
const rangeSlider = {
  min: 0,
  max: 100000,
};
const startSlider = 5000;
const stepSlider = 1;

adFormPrice.value = startSlider;

noUiSlider.create(priceSlider, {
  range: rangeSlider,
  start: startSlider,
  step: stepSlider,
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
    range: rangeSlider,
    start: startSlider,
    step: stepSlider,
  });
}

priceSlider.noUiSlider.on('update', () => {
  adFormPrice.value = priceSlider.noUiSlider.get();
});

export {priceSlider,resetSlider};
