module.exports = function (sequelize, DataTypes) {
  const Search = sequelize.define('Example', {
    criteria: DataTypes.STRING
  });
  return Search;
};
