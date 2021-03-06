import Sequelize, { Model } from 'sequelize';
import { hash, compare } from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    // Hooks
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await hash(
          user.password,
          +process.env.APP_SALT || 8
        );
      }
    });

    return this;
  }

  checkPassword(password) {
    return compare(password, this.password_hash);
  }
}
