import { generateResetToken } from "../../../common/utils/jwt.utils.js"
import User from "./auth.model.js"

const register = async ({name , email,password ,role})=>{
    const existing = await User.findOne({email})

    if(existing) throw ApiError.conflict("Email exists")

    const {rawToken, hashedToken} = generateResetToken()

    await User.create({
        name  ,
        email ,
        password,
        role,
        verificationToken :hashedToken

    })

    //TODO: send an email to user with token :raw token 

    const userObj = User.toObject()
    delete userObj.password
    //mechanism to delete 

    
    return userObj
}


export {register}
