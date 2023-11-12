
import { Router } from "express";
import { getOne, getUser, remove, signIn, signUp, updateUser } from "../controllers/auth";
import { checkRole } from "../middlewares/checkPermission";

const authRouter = Router()

authRouter.post('/signup', signUp)
authRouter.post('/signin', signIn)
authRouter.put('/update/:id', updateUser)
authRouter.get('/', getUser)
authRouter.get('/:id', getOne)
authRouter.delete('/:id', remove)

export default authRouter
