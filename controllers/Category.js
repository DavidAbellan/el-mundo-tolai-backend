var modCategory = require('../models');
var idgen = require('../helpers/id_generator');

async function get_categories(){
    return await modCategory.category.findAll();
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
    categories = modCategory.category.findAll({
        order : [['code','DESC']],
    })
    return categories[0].code;
}

module.exports = {
    get_last_code,
    get_categories,
    set_category,
    get_category_by_code

}