var modCategory = require('../models');
var idgen = require('../helpers/id_generator');

async function get_categories(){
    let categories = await modCategory.category.findAll();
    return categories;
}
async function set_category(name, code){
    let category = new Object ({
        id : idgen.get_random_id(),
        name ,
        code
    })
    await modCategory.category.create(category)
}
async function get_category_by_code(categorycode){
    let category = await modCategory.category.findOne({where:{id : categorycode}});
    return category;
}
async function get_last_code(){
    let categories = await modCategory.category.findAll();
    return Object.keys(categories).length;
    
}

module.exports = {
    get_last_code,
    get_categories,
    set_category,
    get_category_by_code

}