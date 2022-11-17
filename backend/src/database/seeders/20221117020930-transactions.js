module.exports = {
up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('transactions', [
       {
        debitedAccountId: 1,
        creditedAccountId: 2,
        value: 2.50,
        createdAt: '2022/11/17',
      },
      {
        debitedAccountId: 2,
        creditedAccountId: 1,
        value: 3.50,
        createdAt: '2022/11/17',
      },

    ], {});
    
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('transactions', null, {});
  }
};
