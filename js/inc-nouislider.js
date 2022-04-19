const START_SLIDER = 5000;
const STEP_SLIDER = 1;
const priceSlider = document.querySelector('.ad-form__slider');
const adFormPrice = document.querySelector('#price');
const rangeSlider = {
  min: 0,
  max: 100000,
};


adFormPrice.value = START_SLIDER;

noUiSlider.create(priceSlider, {
  range: rangeSlider,
  start: START_SLIDER,
  step: STEP_SLIDER,
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
    start: START_SLIDER,
    step: STEP_SLIDER,
  });
}

priceSlider.noUiSlider.on('update', () => {
  adFormPrice.value = priceSlider.noUiSlider.get();
});

export {priceSlider,resetSlider};
