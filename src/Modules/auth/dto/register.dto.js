import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto";

class RegisterDto extends BaseDto{
    static scheman = Joi.object({
     name : Joi.string().trim().min(2).max(),
     email: Joi.string().email().lowercase().required(),
     password: Joi.string()
     .message("Password must contains 8 char minimum")
     .min(8).required(),
     role: Joi.string().valid("customer","seller").default
     ("customer")

    })
}

export default RegisterDto