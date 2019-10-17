module.exports = function (sequelize, DataTypes) {
  const Messages = sequelize.define('Message', {
    message: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    senderId: DataTypes.INTEGER
  });
  return Messages;
};
