module.exports = {
 up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('users', [
      {
       username: 'John Doe',
       password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
       accountId: 1,
       // password: Trybe678
      },
      {
        username: 'NGCash Trybe',
        password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
        accountId: 2,
        // password: 'Trybe123',
       },
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
