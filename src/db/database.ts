import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', 'postgres', 'Mback123',{
  dialect: 'postgres',
  host: 'localhost', 
  port: 5432
});

export default sequelize;

