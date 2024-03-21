import { Request, Response } from "express";
import Movie from "../models/moviesModels";



export const createMovie = async(req: Request, res: Response) => {
try {
    const {titulo, director, genero, duracion, sinopsis, 
            anio_estreno, pais_origen, sala, horario} = req.body;
    await Movie.sync();//para sincronizar el modelo con la db
    const newMovie = await Movie.create({
     titulo,
      director,
      genero,
      duracion,
      sinopsis,
      anio_estreno,
      pais_origen,
      sala,
      horario
      });
      res.status(201).json(newMovie);
} catch (error) {
    res.status(400).json({ error: 'Datos de entrada inválidos'});
}
}

//trae lista de peliculas
export const getMovies = async (req: Request, res: Response) => {
   
    try {
      const movies = await Movie.findAll({ offset: 1, limit: 20});
  
      if (movies.length === 0) {
        return res.status(404).json({ error: 'No se encontraron películas.' });
      }
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' });
    }
  };


// Actualizar una película existente
export const updateMovie = async (req: Request, res: Response) => {
   
    try {
      const { id } = req.params;
      const {titulo, director, genero, duracion, sinopsis, 
          anio_estreno, pais_origen, sala, horario} = req.body;
    
      const movie = await Movie.findByPk(id);
      if (movie) {
       await movie.update({titulo, director, genero, duracion, sinopsis,
        anio_estreno, pais_origen, sala, horario});

        return res.status(201).json(movie);
      }
    } catch (error) { 
        res.status(400).json({ error: 'Datos de entrada inválidos' });
    }
  };
  

// Eliminar una película
export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const movieId = parseInt(req.params.id);
    const movie = await Movie.findByPk(movieId);

    if (!movie) {
      return res.status(404).json({ error: 'Película no encontrada' });
    }

    await movie.destroy();

    return res.status(200).json({ message: 'Película eliminada exitosamente'  });
  } catch (error) {
   // console.error('Error al eliminar la película:', error);
    return res.status(400).json({ error: 'Datos de entrada inválidos' });
  } 
};

