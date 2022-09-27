
module.exports =(sequelize,dataTypes) => {
    let photo = sequelize.define('photo',{
    id: {type :dataTypes.STRING , primaryKey:true},
    fieldname: {type :dataTypes.STRING , defaultValue:"field"},
    originalname: {type :dataTypes.STRING , defaultValue:"default-pshe-square"},
    mimetype: {type :dataTypes.STRING , defaultValue:"image/png"},
    destination: {type :dataTypes.STRING , defaultValue:"/public/images/"},
    filename: {type :dataTypes.STRING , defaultValue:"default-pshe-square"},
    path: {type :dataTypes.STRING(200) , defaultValue:"https://res.cloudinary.com/dsvuhzcsh/image/upload/v1664199469/articles/znk3zb4iaq0urs0mqn5y.jpg"},
    size : {type : dataTypes.INTEGER, defaultValue : 0},
    photo_author :{type :dataTypes.STRING , defaultValue:"archive.org"},
    articleId :  {type: dataTypes.STRING, required:true},
    

    
   })
 
  
return photo; 
}















