module.exports = function (sequelize, DataTypes) {
  const Search = sequelize.define('Search', {
    criteria: DataTypes.STRING
  });
  return Search;
};
