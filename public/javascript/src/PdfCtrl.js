import { http } from './http';
import envVars  from './envVars';

const PdfCtrl = {
    
    pdfWritten: false,
    
    savePdf: function(data, onStart, startParam, onEnd, endParam) { 
        http.post(`${envVars.postRoute}`, data)
        .then(this.pdfWritten = true)
        .then(() => onStart(startParam))
        .then(() => onEnd(endParam))
        .catch(err => console.log(err));
    },
    
    deletePdf: function(next, nextParam){
        http.delete(`${envVars.deleteRoute}`)
        .then(this.pdfWritten = false)
        .then(next(nextParam))
        .catch(err => console.log(err));
    }
};

export default PdfCtrl;