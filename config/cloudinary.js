const cloudinary = require('cloudinary');
const upload = require('./multer');


async function uploadToCloud(filePath, author){
    cloudinary.config({
        cloud_name: 'dsvuhzcsh',//process.env.CLOUD_NAME,
        api_key : '139164481851365', //process.env.API_KEY,
        api_secret: 'KKWZ-ykTxfLv52sxdDJ7WkATewc',//process.env.API_SECRET 
        secure:true
    })
    console.log(filePath);
    let pic;
    let folder = 'articles';
    if (author) {
       folder = 'profiles';
    }

    try {
    pic = await cloudinary.v2.uploader.upload(filePath, {
        folder:folder
    })
    }catch(error){
        console.log("ERROR", error);
        pic=undefined;
    }
    return pic;
}
module.exports = {uploadToCloud};
