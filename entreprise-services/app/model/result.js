module.exports = (sequelize, Sequelize) => {

    const Result = sequelize.define('results', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        ca: {
            type: Sequelize.INTEGER,
        },
        margin: {
            type: Sequelize.INTEGER
        },
        ebitda: {
            type: Sequelize.INTEGER,
        },
        loss: {
            type: Sequelize.INTEGER,
        },
        year: {
            type: Sequelize.INTEGER,
        },

    });
    return Result;
}