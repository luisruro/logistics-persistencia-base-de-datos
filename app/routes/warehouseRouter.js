import { Router } from "express";
import { pool } from "../../config/db.js";

export const warehouseRouter = Router();

// se pone un "_" en lugar de req, ya que no se va usar y por buenas practicas, todas las variables que se ponen
// deben ser usadas
warehouseRouter.get("/", async (req, res) => {
    try {
        const [warehouses] = await pool.query('SELECT * FROM warehouses');//warehouses va dentro de un array o si no la info va salir un array dentro de otro array
        res.status(200).json({ Message: "Warehouses successfully fetched", data: warehouses });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

const createRequestFunction = async (req, res) => {
    const {name, location} = req.body;
    try {
        //los signos de pregunta son para no pasarle directamente el valor que viene de la solicitud
        //sino de forma preparada
        const warehouseCreated = await pool.query('INSERT INTO warehouses (name, location) VALUES (?, ?)', [name, location]);
        console.log(warehouseCreated);
        res.status(201).json({message: 'Warehouse created successfully'});
    } catch (error) {
        //res.status(500).json({message: 'Error creating', error: error.message});
        res.status(500).json({
            error: error.sqlMessage,
            error: error.message
        });
    }
};

warehouseRouter.post("/", createRequestFunction);

warehouseRouter.put("/:id", async (req, res) => {
    //Para ver lo que me esta manadando
    //res.send(`Este es el ID que me estas enviando ${req.params.id} y ${req.body.name} y ${req.body.location}`);
    const {id} = req.params;
    const {name, location} = req.body;
    try {
        const warehouseUpdated = await pool.query('UPDATE warehouses SET name=?, location=? WHERE id=?', [name, location, id]);
        console.log(warehouseUpdated);
        res.status(200).json({message: 'Warehouse updated successfully'});
    } catch (error) {
        res.status(500).json({
            error: error.sqlMessage,
            error: error.message
        });
    }
});

// Jerarquía de recursos
// recurso siempre en plural
// la url deberia de ir asi: /vehicles/:vehicleId/warehouses
// el fuerte, el id del fuerte y la relación que deseas traer