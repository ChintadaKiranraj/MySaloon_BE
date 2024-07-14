const { where } = require('sequelize');
const {ShopOwners} = require('../models/ShopOwnersEntity');
const { Users } = require('../models/Users');
const imageDecode = require('../utils/EncodeDecode');
const { response } = require('express');

const saveShopeOwners = function(req,res){
    ShopOwners.create(req.body).then((result)=>{
        console.log(result);
        res.send(sucess(result));
    }).catch((error)=>{
        console.log(error);
        res.status(400).send(faild(error))
    });
};

const sucess = function (res) {
    let successResponse = {};
    successResponse.status = true,
    successResponse.code = 200,
    successResponse.message = 'Success....!'
    successResponse.data = res;
    return successResponse;
};

const faild = function (message) {
    let faildResponse = {};
    faildResponse.status = false,
    faildResponse.code = 400,
    faildResponse.message = message
    faildResponse.data = '';
    return faildResponse;
};

const fetchShopeOwnerByUserId = function(req,res){
    let userId = req.params.userId;
    ShopOwners.findAll({where:{userId:userId}}).then((result)=>{
        console.log(result);
        if(result!=null){
        imageConvert(result);
        }
        res.send(sucess(result));
    }).catch((error)=>{
        console.log(error);
        res.status(400).send(faild(error));
    });

};

const updateShopOwner = async function(req,res){
    let user = await ShopOwners.findByPk(req.body.shopOwnerId);
    if(!user){
        console.log(user);
        res.status(400).send(faild('user not found...! please check once'));
    }
    await user.update(req.body).then((result)=>{
        console.log(result);
        res.send(sucess(result));
    }).catch((error)=>{
        console.log(error);
        res.status(400).send(faild(error));
    });
}

const fetchAllShopeLocation = function(req,res){
    ShopOwners.findAll({attributes:['location'],
    group: ['location'], order: [
        ['location', 'ASC']]}).then((result)=>{
        console.log(result);
        res.send(sucess(result));
    }).catch((error)=>{
        res.status(400).send(faild(error));
    })
}

const imageConvert = function(images){
     return images.forEach(e=>{
        if(e.profile!=null){
        const image = e.profile.toString('base64');
        e.profile = imageDecode.base64Decode(image);
        }

    })

}

const fetchAll = function(req,res){
    ShopOwners.findAll().then((result)=>{
        console.log(result);
        if(result!=null){
        imageConvert(result);
        }
        res.send(sucess(result))

    }).catch((error)=>{
        res.status(400).send(faild(error));
    })
}

const fetchByPrimaryKey = async function(req,res){
    await ShopOwners.findByPk(req.params.shopeOwnerId).then((result)=>{
        console.log(result);
        if(result!=null){
        result.dataValues.profile = imageDecode.base64Decode(result.dataValues.profile);
        }
        res.send(sucess(result));
    }).catch((error)=>{
        console.error(error);
        res.status(400).send(faild(error.message));
    })
}

const convertShopOwnerDTOObject = function(data){
    let result = data.dataValues;
    let arrayOfObject = new Array;
    //let arraofObject = [];
    data.forEach(e=>{
        let ShopOwnerDTO = {};
        let result = e.dataValues;
        ShopOwnerDTO.shopName = result.shopName;
        ShopOwnerDTO.shopeOwnerId = result.shopOwnerId;
        ShopOwnerDTO.profile = (result.profile != null) ? imageDecode.base64Decode(result.profile) : null;
        ShopOwnerDTO.location = result.location;
        ShopOwnerDTO.emailId = result.user.emailId;
        ShopOwnerDTO.firstName = result.user.firstName;
        ShopOwnerDTO.lastName = result.lastName;
        ShopOwnerDTO.userId = result.userId;
        arrayOfObject.push(ShopOwnerDTO);
    });
    return arrayOfObject;

}

// const fetchByBasedOnLocation = function(req,res){
//     ShopOwners.findAll({
//         where:{
//             location :req.params.shopeLocation
//         }
//     }).then((result)=>{
//         console.log(result);
//         imageConvert(result);
//         res.send(sucess(result));
//     }).catch((error)=>{
//         console.log(error);
//         res.send(faild(error.message));
//     })
// };

const fetchByBasedOnLocation2 = function(req,res){
    ShopOwners.findAll({
        include:[{model:Users}],
        where:{
            location :req.params.shopeLocation
        }
    }).then((result)=>{
        console.log(result);
        let response = convertShopOwnerDTOObject(result);
        res.send(sucess(response));
    }).catch((error)=>{
        console.log(error);
        res.send(faild(error.message));
    })
    
}

const deleteByShopById = function(req,res){
    console.log(req)
    ShopOwners.destroy({where:{shopOwnerId:req.params.shopOwnerId}})
    .then((response)=>{
        console.log(response);
        res.send(sucess(response));
    }).catch((error)=>{
        console.log(error);
        res.status(400).send(error.message);
    })
}

module.exports = {saveShopeOwners,fetchShopeOwnerByUserId,updateShopOwner,fetchAllShopeLocation, fetchAll,fetchByPrimaryKey,fetchByBasedOnLocation2,deleteByShopById}