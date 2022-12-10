import { Model, INTEGER, FLOAT, DATE } from 'sequelize';
import db from '.';
import Account from './account';


class Transaction extends Model {
  id!: number;
  debitedAccountId: number;
  creditedAccountId: number;
  value: number;
  createdAt: Date;

}

Transaction.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  debitedAccountId: {
    type: INTEGER,
    allowNull: false,
  },
  creditedAccountId: {
    type: INTEGER,
    allowNull: false,
  },
  value: {
    type: FLOAT,
    allowNull: false,
  },
  createdAt: {
    type: DATE,
    allowNull: false,
  },

}, {
  underscored: true,
  sequelize: db,
  modelName: 'transactions',
  timestamps: true,
});

Account.hasMany(Transaction, { foreignKey: 'debitedAccountId' });
Account.hasMany(Transaction, { foreignKey: 'creditedAccountId' });




export default Transaction;