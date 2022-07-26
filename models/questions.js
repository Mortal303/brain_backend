module.exports = (sequelize, Sequelize) => {

    const Tutorial = sequelize.define("questions", {
        title: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        question: {
            type: Sequelize.STRING
        },
        answer:{
            type: Sequelize.STRING
        },
        options:{
            type: Sequelize.STRING
        }
    });
    return Tutorial;
};