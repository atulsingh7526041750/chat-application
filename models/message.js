// message.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Message = sequelize.define('Message', {
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Message;
