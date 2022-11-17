module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('accounts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      balance: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
     });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('accounts');
  }
};
