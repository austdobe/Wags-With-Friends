module.exports = function (sequelize, DataTypes) {
  const Messages = sequelize.define('messages', {
    message: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    senderId: DataTypes.INTEGER
  });
  return Messages;
};
