module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('incidents', 'file_id', {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNul: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('incidents', 'file_id');
  },
};