"use strict";
var md5 = require('md5');
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED ,
        primaryKey: true ,
        autoIncrement: true
    },
    first_name : {
      type:DataTypes.STRING,
      allowNull: false,
    },
    email : {
        type:DataTypes.STRING,
        allowNull: false,
        unique:true
    } ,
    password : {
        type:DataTypes.STRING,
        allowNull: false,
        set(val) {
            this.setDataValue('password', md5(val));
        }
    },
    remember_token :{
        type:DataTypes.STRING,
        allowNull: false,
    },
    created_at :{
      type: 'TIMESTAMP' ,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at :{
      type: 'TIMESTAMP' ,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    avatarPath : DataTypes.TEXT ,
  }
  ,
  {
    timestamps: false,
      freezeTableName:true
  }
  , {
    classMethods: {
      associate: function(models) {
        // users.hasMany(models.messages, {foreignKey: 'receiver_id', sourceKey:'id' , as:'userM'});
        users.hasMany(models.messages, {foreignKey: 'sender_id' , sourceKey:'id', as:'userM'});
      }
    }
  });

  return users;
};
