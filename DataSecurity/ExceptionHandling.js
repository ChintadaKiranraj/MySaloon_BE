const encodedecoding = require('../DataSecurity/EncodeDecode')

function success(data){
    let response = {};
    // let  responseData = encodedecoding.encode(data);
    response.message = 'sucess!',
    response.status = true,
    response.data = data
    return response;
}

function failuer(message){
    let response = {};
    response.message = message,
    response.status = false,
    response.data = ''
    return response;
}

function filterArray(data){
    let array = [];
    data.forEach((e)=>{
        array.push(e._previousDataValues);
    })
    console.log(array);
    return array;
}

module.exports = {
    success, failuer,filterArray
}