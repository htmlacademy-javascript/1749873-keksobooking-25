import {setFormSubmit} from'./form-validate.js';
import {adErrorMessage, adSuccesMessage} from './template.js';
import './image-load.js';

setFormSubmit(adSuccesMessage, adErrorMessage);
