import { Sequelize } from "sequelize";
import * as db from '../config/database';

export default new Sequelize(db);