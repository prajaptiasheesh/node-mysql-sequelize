const addProductCategory = async (body, params, query)=>{

    const { ProductCategories, sequelize } = global['db'];
    const t = await sequelize.transaction();

    // First, we start a transaction from your connection and save it into a variable
    return ProductCategories.findOne({ where : {
                  title: body.title
            }}).then(async(result)=>{
            
                if(result){
                    throw new Error("Product category already exists");
                }else{
                    try {
                        
                        let result = await ProductCategories.create({
                            title: body.title,
                            name: body.name
                        }, { transaction: t })
                        t.commit();
                        return result?.toJSON()
                    } catch (error) {
                        t.rollback()
                        throw error;
                    }
                }
            })
}

const listCategory = async (body, params, query)=>{

    let { ProductCategories } = global["db"];
    return ProductCategories.findAll({ raw: true })
}

const deleteCategory = async (body, params, query)=>{
    let { catId } = params;
    let { ProductCategories, sequelize } = global['db'];
    const t = await sequelize.transaction();

        return ProductCategories.findOne({ where: { id: catId } })
        .then(category=>{
            if(category){
                return category.destroy({ transaction: t })
                        .then(res=>{
                            if(res){
                                category  = category?.toJSON()
                                t.commit()
                                return category;
                            }else{
                                t.rollback()
                                throw new Error("failed to destroy category")
                            }
                        })
            }else{
                throw new Error("Category does not exist");
            }
        })
}
module.exports = {
    addProductCategoryController: addProductCategory,
    listCategoryController: listCategory,
    deleteCategoryController: deleteCategory
}