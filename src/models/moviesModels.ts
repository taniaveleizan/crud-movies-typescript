import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/database';

class Movie extends Model {
  public id!: number;
  public titulo!: string;
  public director!: string;
  public genero!: string;
  public duracion!: Date;
  public sinopsis!: string;
  public anio_estreno!: number;
  public pais_origen!: string;
  public sala!: string;
  public horario!: Date;
}

Movie.init(
  {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    director: {
      type: DataTypes.STRING(100),
    },
    genero: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    duracion: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    sinopsis: {
      type: DataTypes.TEXT,
    },
    anio_estreno: {
      type: DataTypes.INTEGER,
    },
    pais_origen: {
      type: DataTypes.STRING(100),
    },
    sala: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    horario: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Movie',
    tableName: 'movies',
    timestamps: false
  }
);

console.log(Movie === sequelize.models.Movie);


export default Movie;

