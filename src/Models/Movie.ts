import { DataTypes } from "sequelize";

module.exports = (sequelize: any) => {
  sequelize.define("movie", {
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
