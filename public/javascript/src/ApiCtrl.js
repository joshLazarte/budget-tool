import { http } from './http';
import envVars  from './envVars';

const ApiCtrl = {

    sendToDb: function(data) {        
        http.post(`${envVars.postRoute}`, data)                                
        .catch(err => console.log(err));
    }   
}

export default ApiCtrl;