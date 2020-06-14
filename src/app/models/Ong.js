import Sequelize, { Model } from 'sequelize';

class Ong extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        // password: Sequelize.VIRTUAL,
        whatsapp: Sequelize.STRING,
        city: Sequelize.STRING,
        uf: Sequelize.STRING,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async ong => {
      if (ong.password) {
        ong.password_hash = await bcrypt.hash(ong.password, 8);
      }
    });

    return this;
  }


}

export default Ong;