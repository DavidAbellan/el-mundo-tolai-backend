var mod = require('../models');
var Photo = require('../models/Photo');
var idgen = require('../helpers/id_generator');
var cloudinary = require("../config/cloudinary");

async function update_path_photo(photo) {
    return await mod.photo.update( {
        path: photo.path,
    }, 
    {
        where: {id : photo.id}, 
    })
}
async function set_default_photo ( articleId) {
let photo = {
    id:idgen.get_random_id(),
    fieldname: "file",
    originalname:"default-pshe-square.png",
    mimetype: "image/png",
    destination:"./public/images/",
    filename:"default-pshe-square.png",
    path: "https://res.cloudinary.com/dsvuhzcsh/image/upload/v1664199469/articles/znk3zb4iaq0urs0mqn5y.jpg",
    size :  0,
    photo_author :"archive.org",
    articleId ,
};    

return await mod.photo.create(photo);
}
async function set_photos (photoArray){
     await mod.photo.bulkCreate(photoArray);
     return;    
    //buscar otro alojamiento para fotos 
}
async function get_main_photo (artId){
    let principal = await mod.photo.findOne({where : {articleId : artId}});
    return principal;
}
async function delete_photos_from_article(articleID){
    return await mod.photo.destroy({where : {articleId : articleID}});
}
async function return_photos (artId){
    return await mod.photo.findAll({where:{articleId : artId}});
}
async function set_photo(image){
    return await mod.photo.create(image);
}

module.exports = {
    update_path_photo,
    return_photos,
    delete_photos_from_article,
    set_photo,
    get_main_photo,
    set_photos,
    set_default_photo
}