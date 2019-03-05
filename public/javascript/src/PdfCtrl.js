import { http } from './http';
import envVars  from './envVars';

const PdfCtrl = {

    savePdf: function(data, onStart, startParam, onEnd, endParam) { 
        http.post(`${envVars.postRoute}`, data)
        .then(data => console.log(data))
        .then(() => onStart(startParam))
        .then(() => onEnd(endParam))
        .catch(err => console.log(err));
    }   
};

export default PdfCtrl;