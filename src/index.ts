import express from 'express';
import indexRoutes from './routes/index';


const app = express();

//middlewares
app.use(express.json());


app.use(indexRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log(`El servidor está corriendo en el puerto ${PORT}`);
  });

  export default app;