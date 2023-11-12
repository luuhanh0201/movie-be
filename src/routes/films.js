import { Router } from "express";
import { create, getAll, getOne, remove, update } from "../controllers/film";

const routerFilm = Router()

routerFilm.get('/',getAll)
routerFilm.get('/:id',getOne)
routerFilm.post("/",create)
routerFilm.put("/:id",update)
routerFilm.delete("/:id",remove)

export default routerFilm
