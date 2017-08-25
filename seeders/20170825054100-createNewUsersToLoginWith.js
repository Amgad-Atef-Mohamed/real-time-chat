'use strict';
var md5 = require('md5');
module.exports = {
  up: function (queryInterface, Sequelize) {

      return queryInterface.bulkInsert('users', [{
        first_name: 'code Tech',
        email: 'codeTech@codetec.com',
        password: md5('123456'),
        remember_token: 'remember_token',
        avatarPath: '1.jpg'
      },{
          first_name: 'amgad',
          email: 'amgad@hotmail.com',
          password: md5('123456'),
          remember_token: 'remember_token',
          avatarPath: '2.jpg'
      },{
          first_name: 'moamen',
          email: 'moamen@hotmail.com',
          password: md5('123456'),
          remember_token: 'remember_token',
          avatarPath: '3.jpg'
      },{
          first_name: 'the wood',
          email: 'thewood@hotmail.com',
          password: md5('123456'),
          remember_token: 'remember_token',
          avatarPath: '4.jpg'
      },{
          first_name: 'yahya',
          email: 'yahya@hotmail.com',
          password: md5('123456'),
          remember_token: 'remember_token',
          avatarPath: '5.PNG'
      }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
