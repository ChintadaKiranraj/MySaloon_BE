const encodedecoding = require('../DataSecurity/EncodeDecode')

function success(data){
    let response = {};
    let  responseData = encodedecoding.encode(data);
    response.message = 'sucess!',
    response.status = true,
    response.data = responseData
    return response;
}

function failuer(message){
    let response = {};
    response.message = message,
    response.status = false,
    response.data = ''
    return response;
}

module.exports = {
    success, failuer
}