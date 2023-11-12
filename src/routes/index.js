import { Router } from "express";
import authRouter from "./auth";
import routerImages from "./upload";
import routerFilm from "./films";

const router = Router()
router.use("/films", routerFilm)
router.use("/auth", authRouter)
router.use("/images", routerImages)
export default router