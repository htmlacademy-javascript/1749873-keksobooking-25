import {createAds} from './util.js';

const getArrayAds = Array.from({length: 10}, createAds);
// eslint-disable-next-line no-console
console.log(getArrayAds);

