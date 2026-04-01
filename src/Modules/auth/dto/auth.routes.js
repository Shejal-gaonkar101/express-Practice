import {Router} from "express"
import * as controller from "./auth.controller.js"
import RegisterDto from "./register.dto"



const router = Router()

router.post("/register", validate(RegisterDto),controller.register)

export default router