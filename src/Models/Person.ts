import { DataTypes } from "sequelize";

module.exports = (sequelize: any) => {
  sequelize.define("person", {
    Name: {
      type: DataTypes.STRING,
    },
    LastName: {
      type: DataTypes.STRING,
    },
    Age: {
      type: DataTypes.INTEGER,
    },
  });
};
