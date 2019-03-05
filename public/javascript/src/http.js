import "isomorphic-fetch";

class EasyHTTP {
    //make http get reqeusts
    async get(url) {
        const response = await fetch(url);
        const resData = await response.json();
        return resData;
    }
    
    //make post request
    async post(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        });              
        const resData = await response.json(); 
        return resData;        
    }
    
    //put
    async put(url, data) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        });
        const resData = await response.json();
        return resData;
    }
    
    //delete
    async delete(url) {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json; charset=utf-8'
            }
        });
        const resData = await 'Resource Deleted...';
        return resData;
    }
}

export const http = new EasyHTTP();