import { Router } from "express";
import { getAll,InsertNewDataController,UpdateById,deleteById,getById} from "../controllers/warehousesControllers.js";


export const warehouserouter=Router()

warehouserouter.get('/',getAll)
warehouserouter.get('/:id',getById)
warehouserouter.post(`/`,InsertNewDataController)
warehouserouter.put('/:id',UpdateById)
warehouserouter.delete('/:id',deleteById)