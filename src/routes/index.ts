import { Router } from "express";
import { createMovie, deleteMovie, getMovies, updateMovie } from "../controllers/index.controllers";



const router = Router();

//crear e insertar datos en la tabla
router.post('/movies', createMovie);

//para traer lista de tablas
router.get('/movies', getMovies);

//actualizar datos de tabla
router.patch('/movies/:id', updateMovie);

//eliminar pelicula de la tabla
router.delete('/movies/:id', deleteMovie);

export default router;