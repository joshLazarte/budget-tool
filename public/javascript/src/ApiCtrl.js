import { http } from './http';
import envVars  from './envVars';

const ApiCtrl = {

    sendToDb: function(data, cb) {        
        http.post(`${envVars.postRoute}`, data)                                        
        .catch(err => console.log(err));
        cb();
    }   
}

export default ApiCtrl;