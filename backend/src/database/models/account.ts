import { FLOAT, INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class Account extends Model {
  id!: number;
  teamName: string;
}

Account.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  balance: {
    type: FLOAT,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'accounts',
  timestamps: false,
});



export default Account;