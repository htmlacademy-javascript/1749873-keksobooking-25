import {setFormSubmit} from'./form-validate.js';
import {adErrorMessage, adSuccesMessage} from './template.js';
import './image-load.js';
import {setMap} from './inc-leaflet.js';
import {adFormActivate} from './form.js';
setMap(()=>{adFormActivate();} );
setFormSubmit(adSuccesMessage, adErrorMessage);
