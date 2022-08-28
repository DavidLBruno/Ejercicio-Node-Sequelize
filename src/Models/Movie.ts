import { DataTypes } from "sequelize";

module.exports = (sequelize: any) => {
  sequelize.define("movie", {
    Title: {
      type: DataTypes.STRING,
    },
    Year: {
      type: DataTypes.STRING,
    },
  });
};
