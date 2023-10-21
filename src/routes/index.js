import { Router } from "express";
import moviesRouter from "./movies";
import authRouter from "./auth";
import routerImages from "./upload";

const router = Router()
router.use("/movies", moviesRouter)
router.use("/auth", authRouter)
router.use("/images", routerImages)
export default router