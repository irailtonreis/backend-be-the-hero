import Sequelize, { Model } from 'sequelize';

class Incident extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        value: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, {
      foreignKey: 'file_id',
      as: 'foto',
    });
  }
}

export default Incident;