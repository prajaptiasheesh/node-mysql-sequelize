
const { Op } = require("sequelize");
const { isValidHashUsingSalt } = require('../utils');
const JwtService = require('../services/jwt.service')
const register = async (body, params, query)=>{

    const { Users, Roles, UserRoles, sequelize } = global['db'];
    // First, we start a transaction from your connection and save it into a variable
    const t = await sequelize.transaction();
    const role = Roles.findOne({
        when: { id: body.roleId }
    })

    return Users.create({ 
            firstName: body.firstName, 
            lastName: body.lastName, 
            password: body.password, 
            email: body.email, 
            userName: body.userName, 
        }, { transaction: t }).then(async(result)=>{
                await UserRoles.create({ roleId: role.id, userId: result.id }).toJSON()
                await t.commit()
                let { password, salt, ...user} = result.toJSON();
                user.role = role;
                return user;
        }).catch(async(err)=>{
            await t.rollback();
            throw err;
        });
}

const login = async (body, params, query)=>{

    const { Users, sequelize } = global['db'];
    // First, we start a transaction from your connection and save it into a variable

    return Users.findOne({ where : {
                   [Op.or]: [{ email: body.email }, { userName: body.userName }]
            }}).then(async(result)=>{
            
                let { password, salt, ...user} = result.toJSON();
                
                let enteredPwd = body.password;
                if(!isValidHashUsingSalt(enteredPwd, password, salt)){
                    throw new Error("password or email doesn't match");
                }else{
                   return JwtService.generateToken(user)
                }
            });
}

module.exports = {
    registerController: register,
    loginController: login
}