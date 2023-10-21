import { Router } from "express";
import { getAll } from "../controllers/movie";

const moviesRouter = Router()

moviesRouter.get('/',getAll)

export default moviesRouter
