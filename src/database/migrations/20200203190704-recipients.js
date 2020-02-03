module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('recipients', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        number: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        complement: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        district: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        city: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        state: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        zip: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      })
      .then(() => queryInterface.addIndex('recipients', ['id', 'zip']));
  },

  down: queryInterface => {
    return queryInterface.dropTable('recipients');
  },
};
