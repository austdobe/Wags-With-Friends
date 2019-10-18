module.exports = function (sequelize, DataTypes) {
  const Message = sequelize.define('Message', {
    message: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    senderId: DataTypes.INTEGER
  });
  return Message;
};
