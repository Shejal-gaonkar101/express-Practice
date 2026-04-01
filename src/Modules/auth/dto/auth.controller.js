import * as authService from "./auth.service.js" 
import ApiResponse from '../../'


const register = async()=>{
 const user = await authService.register(req.body)
 ApiResponse.created(resizeBy,"Registration success",user)
 

}

export{register}