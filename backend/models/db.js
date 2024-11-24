const Sequelize = require ('sequelize');

//Conexão com o banco de dados
const sequelize = new Sequelize('estacionamento', 'root', 'root', {
    host: "localhost",
    port: "3306",
    dialect: 'mysql'
});

// Vamos exportar as variaveis
module.exports = {
    Sequelize : Sequelize,
    sequelize : sequelize
}