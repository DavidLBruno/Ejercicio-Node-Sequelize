import { DataTypes } from "sequelize";

module.exports = (sequelize: any) => {
  sequelize.define("person", {
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
