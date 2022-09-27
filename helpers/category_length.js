var catControl = require('../controllers/Category');
async function large () {
 let cats = await catControl.get_last_code();
 console.log(cats);
 return cats;
}
module.exports = {
    large
}