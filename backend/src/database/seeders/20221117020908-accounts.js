
module.exports = {
  up: async  (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('accounts', [
    {
      balance: 101.99,
    },
    {
      balance: 102.99,
    },

  ], {});
    
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('accounts', null, {});
  }
};
