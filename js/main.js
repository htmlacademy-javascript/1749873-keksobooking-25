import {setFormSubmit} from'./form-validate.js';
import {adErrorMessage, adSuccesMessage} from './template.js';
import './form.js';
import './inc-leaflet.js';
import './inc-nouislider.js';
setFormSubmit(adSuccesMessage, adErrorMessage);
