module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: DataTypes.STRING
  });

  User.associate = (models) => {
    User.hasMany(models.Todo, { foreignKey: "userId" });
  };

  return User;
};
