import ApiError from "../utils/api.error.js"

const validate =(Dtoclass)=>{
    return (req, res,next)=>{
       const {error,value}= Dtoclass.validate(req.body)
       if(error){
         throw ApiError.badRequest(error.join("; "))
       }
     req.body =value // this means that only value that is the required data we are passing
     next()
    }
    
}


export default validate 