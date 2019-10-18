module.exports = function (sequelize, DataTypes) {
  const Message = sequelize.define('Message', {
    message: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    senderId: DataTypes.INTEGER,
    senderName: DataTypes.STRING
  });

  // Message.associate = function (models) {
  //   Message.belongsTo(models.User, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return Message;
};
