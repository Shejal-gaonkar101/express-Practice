import joi from "joi"

class BaseDto {
  static schema = joi.object({})

  static validate(data){
    this.schema.validate(data,{
          abortEarly : false,
          stripUnknown : true
    })

    if(error){
        const_errors=error.details.map((d)=>d.message)
        return {errors, value:null}

    }
  
    return {errors: null, value }
  }
}

export default BaseDto