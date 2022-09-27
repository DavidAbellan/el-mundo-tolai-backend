var mod = require('../models');
var idgen = require('../helpers/id_generator');
var cloudinary = require('../config/cloudinary');
const DEFAULT_PICTURE = "https://res.cloudinary.com/dsvuhzcsh/image/upload/v1664260951/profiles/ykszqend9sspejcfayzl.png";

async function set_default_potrait(authorID){
    let picture = {};
    picture.author_id= authorID;
    picture.path = DEFAULT_PICTURE;
    picture.id = idgen.get_random_id();
    return await mod.picture.create(picture);

}
async function set_picture(picture,authorID){
    picture.author_id = authorID;
    picture.id = idgen.get_random_id();
    await mod.picture.create(picture);
    let authCl = await cloudinary.uploadToCloud(picture.path,true);
    await mod.picture.update({
        path : authCl.url,
    }, {
        where : {id : picture.id}
    } )  
    return picture;

}
async function get_picture(id){
    return await mod.picture.findOne({where : {author_id : id}});
}

module.exports={
    set_default_potrait,
    set_picture,
    get_picture
}