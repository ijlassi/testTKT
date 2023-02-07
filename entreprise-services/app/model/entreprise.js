module.exports = (sequelize, Sequelize) => {
    const Entreprise = sequelize.define("entreprises", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      sector: {
        type: Sequelize.STRING,
      },
      siren : {
        type: Sequelize.INTEGER,
      }
    });

    return Entreprise;
  };