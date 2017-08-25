"use strict";

module.exports = function(sequelize, DataTypes) {
  var messages = sequelize.define("messages", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED ,
        primaryKey: true ,
        autoIncrement: true
    },
    message_subject : {
        type:DataTypes.STRING
    },
    message_body :{
        type: DataTypes.TEXT,
        allowNull:false
    } ,
    sender_id : {
        type: DataTypes.INTEGER.UNSIGNED ,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        }
    },
    receiver_id :{
        type: DataTypes.INTEGER.UNSIGNED ,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        }
    },
    conversation_id : {
        type:DataTypes.STRING,
        allowNull : false
    } ,
    created_at : {
        type: 'TIMESTAMP' ,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at :{
        type: 'TIMESTAMP' ,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    viewed : DataTypes.BOOLEAN
  },
  {
    timestamps: false,
    freezeTableName:true,
  }, {
    classMethods: {
      associate: function(models) {
        // messages.belongsTo(models.users, {foreignKey: 'receiver_id', as:'userM'});
        messages.belongsTo(models.users, {foreignKey: 'sender_id' ,'targetKey':'id' , as:'userM'});

      }
    }
  });

  return messages;
};
