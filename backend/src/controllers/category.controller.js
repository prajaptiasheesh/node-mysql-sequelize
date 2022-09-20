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

module.exports = {
    addProductCategoryController: addProductCategory,
}