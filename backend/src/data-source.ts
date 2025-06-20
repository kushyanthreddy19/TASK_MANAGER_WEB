import * as dotenv from 'dotenv';
import { DataSource } from "typeorm";
import { Task } from "./entity/Task";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: process.env.DB_NAME || "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Task],
  subscribers: [],
  migrations: [],
});