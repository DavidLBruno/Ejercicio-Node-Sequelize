import { DataTypes } from "sequelize";

module.exports = (sequelize: any) => {
  sequelize.define("rol", {
    RolName: {
      type: DataTypes.STRING,
    },
    Movie: {
      type: DataTypes.STRING,
    },
  });
};
