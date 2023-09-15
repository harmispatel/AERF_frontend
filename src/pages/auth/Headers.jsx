import { getAuthenticationToken } from "../utils/checkAuthentication"

function Headers() {
    let token = getAuthenticationToken();
    let headers = {
        "Content-type": "multipart/form-data"
    };
    if(token) {
        headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            "Authorization": "Bearer " + token
        }
    }
    return headers;
}

export {
    Headers
}