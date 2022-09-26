const getUsers = async (body, params, query)=>{


    
}

const addUserToProduct = async (body, params, query, req)=>{
    let productId = body.productId
    let { user } = req;

    let { UserProducts, Products, User, sequelize } = global['db'];
    const t = await sequelize.transaction();

    return UserProducts.findOne({
                where: {
                    productId: productId,
                    userId: user.id
                }
            }).then(userProduct=>{

                if(userProduct?.toJSON()){
                    throw new Error("Product already exist for this user");
                }else{
                    userProduct = UserProducts.build({ userId: user.id, productId },  { transaction: t });

                    return User.findAll({
                        where: { id: user.id },
                        include: [Products]
                    })
                }
            }).catch(err=>{
                t.rollback();
                throw err;
            })
}

module.exports = {
    getUsersController: getUsers,
    addUserToProductController: addUserToProduct
}