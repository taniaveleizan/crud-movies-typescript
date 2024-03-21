import { Request, Response } from 'express';
import { createMovie, getMovies, updateMovie, deleteMovie } from '../src/controllers/index.controllers';
import Movie from '../src/models/moviesModels';

// Mock Express Request y Response
const mockRequest = () => {
  const req: Partial<Request> = {};
  return req as Request;
};

const mockResponse = () => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return res as Response;
};

// Pruebas para createMovie
describe('createMovie', () => {
  it('debería crear una nueva película y devolverla', async () => {
    const req = mockRequest();
    const res = mockResponse();
    req.body = {
      titulo: 'Titulo de la película',
      director: 'Director de la película',
      genero: 'Género de la película',
      duracion: '01:30:00',
      sinopsis: 'Sinopsis de la película',
      anio_estreno: 2023,
      pais_origen: 'País de origen de la película',
      sala: 'Sala de proyección',
      horario: '14:00:00',
    };

    await createMovie(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      titulo: 'Titulo de la película',
      director: 'Director de la película',
      genero: 'Género de la película',
      duracion: '01:30:00',
      sinopsis: 'Sinopsis de la película',
      anio_estreno: 2023,
      pais_origen: 'País de origen de la película',
      sala: 'Sala de proyección',
      horario: '14:00:00'
    }));
  });

  it('debería devolver un error si los datos de entrada son inválidos', async () => {
    const req = mockRequest();
    const res = mockResponse();
    req.body = {}; // Datos de entrada inválidos

    await createMovie(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Datos de entrada inválidos' });
  });
});

// Pruebas para getMovies
describe('getMovies', () => {
  it('debería devolver una lista de películas', async () => {
    const req = mockRequest();
    const res = mockResponse();

    await getMovies(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it('debería devolver un error si no se encuentran películas', async () => {
    const req = mockRequest();
    const res = mockResponse();
    jest.spyOn(Movie, 'findAll').mockResolvedValue([]); // Simular que no se encontraron películas

    await getMovies(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'No se encontraron películas.' });
  });

  it('debería devolver un error si ocurre un error al obtener películas', async () => {
    const req = mockRequest();
    const res = mockResponse();
    jest.spyOn(Movie, 'findAll').mockRejectedValue(new Error('Error al obtener películas')); // Simular error

    await getMovies(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Ocurrió un error al procesar la solicitud.' });
  });
});

// Pruebas para updateMovie
describe('updateMovie', () => {
  it('debería actualizar una película existente y devolverla', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const mockMovie : any = {
      id: 1,
      titulo: 'Titulo de la película',
      director: 'Director de la película',
      genero: 'Género de la película',
      duracion: '01:30:00',
      sinopsis: 'Sinopsis de la película',
      anio_estreno: 2023,
      pais_origen: 'País de origen de la película',
      sala: 'Sala de proyección',
      horario: '14:00:00',
      update: jest.fn().mockResolvedValue(true),
    };
    jest.spyOn(Movie, 'findByPk').mockResolvedValue(mockMovie); // Simular que se encuentra la película
    req.params = { id: '1' };
    req.body = { ...mockMovie };

    await updateMovie(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockMovie);
  });

  it('debería devolver un error si los datos de entrada son inválidos', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const mockMovie : any = {
      id: 1,
      titulo: 'Titulo de la película',
      director: 'Director de la película',
      genero: 'Género de la película',
      duracion: '01:30:00',
      sinopsis: 'Sinopsis de la película',
      anio_estreno: 2023,
      pais_origen: 'País de origen de la película',
      sala: 'Sala de proyección',
      horario: '14:00:00',
    };
    jest.spyOn(Movie, 'findByPk').mockResolvedValue(mockMovie); // Simular que se encuentra la película
    req.params = { id: '1' };
    req.body = {}; // Datos de entrada inválidos

    await updateMovie(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Datos de entrada inválidos' });
  });
});

// Pruebas para deleteMovie
describe('deleteMovie', () => {
  it('debería eliminar una película existente', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const mockMovie : any = {
      id: 1,
      destroy: jest.fn().mockResolvedValue(true),
    };
    jest.spyOn(Movie, 'findByPk').mockResolvedValue(mockMovie); // Simular que se encuentra la película
    req.params = { id: '100' };

    await deleteMovie(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Película eliminada exitosamente' });
  });

  it('debería devolver un error si la película no se encuentra', async () => {
    const req = mockRequest();
    const res = mockResponse();
    req.params = { id: '1' }; // Establecer el parámetro id para simular la búsqueda de una película específica

    jest.spyOn(Movie, 'findByPk').mockResolvedValue(null); // Simular que la película no se encuentra

    await deleteMovie(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Película no encontrada' });
  });

  it('debería devolver un error si ocurre un error al eliminar la película', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const mockMovie : any = {
      id: 1,
      destroy: jest.fn().mockRejectedValue(new Error('Error al eliminar la película')),
    };
    jest.spyOn(Movie, 'findByPk').mockResolvedValue(mockMovie); // Simular que se encuentra la película
    req.params = { id: '1' };

    await deleteMovie(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Datos de entrada inválidos' });
  });
});