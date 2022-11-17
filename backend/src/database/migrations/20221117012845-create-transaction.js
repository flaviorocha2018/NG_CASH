module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.createTable('transactions', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        debitedAccountId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        creditedAccountId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        value: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('transactions');
  }
};
