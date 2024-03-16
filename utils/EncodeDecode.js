const crypto = require('crypto')
const secretKey = '12345';

const ENC= 'bf3c199c2470cb477d907b1e0917c17b';
const IV = "5183666c72eec9e4";
const ALGO = "aes-256-cbc"


function base64Decode(encodeString){
    return Buffer.from(encodeString, 'base64').toString('utf-8'); 
}

function encode(data){
    // window.btoa(data);
     //or
    let jsonObject = JSON.stringify(data);
    // const encodedData = Buffer.from(jsonObject).toString('base64');
    //  or
    // const cipher = crypto.createCipher('aes-256-cbc', secretKey);
    // let encryptedData = cipher.update(jsonObject, 'utf-8', 'hex');
    // encryptedData += cipher.final('hex');
    // console.log(encryptedData);
    //or
    let cipher = crypto.createCipheriv(ALGO, ENC, IV);
   let encrypted = cipher.update(jsonObject, 'utf8', 'base64');
   encrypted += cipher.final('base64');
//    decode(encrypted);
   return encrypted
}

function decode(data){
    // window.atob(data); 
    //or
    // const decodedData = Buffer.from(data, 'base64').toString('utf-8'); 
    //or
    // const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
    // let decryptedData = decipher.update(data, 'hex', 'utf-8');
    // decryptedData += decipher.final('utf-8');
    // console.log(decryptedData);
    //or
    let decipher = crypto.createDecipheriv(ALGO, ENC, IV);
   let decrypted = decipher.update(data, 'base64', 'utf8');
   decrypted += decipher.final('utf8');
   console.log(decrypted);
   return (decrypted);
}


module.exports = {
    encode, decode,base64Decode
}