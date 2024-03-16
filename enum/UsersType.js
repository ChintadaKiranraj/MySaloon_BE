const enums = require('enum');
const userTypes = function(req,res){
    var usertype = new enums({'User':1,'Shope Owner':2, 'Barber':3});
    res.send( usertype.enums);

}

module.exports = {userTypes}
