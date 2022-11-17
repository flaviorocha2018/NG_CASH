import { Model, INTEGER, BOOLEAN, FLOAT, DATE } from 'sequelize';
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
  timestamps: false,
});

Transaction.belongsTo(Account, { foreignKey: 'AccountsId', as: 'AccountsId' });

Account.hasMany(Transaction, { foreignKey: 'AccountsId', as: 'AccountsId' });

export default Transaction;