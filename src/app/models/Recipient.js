import Sequelize, { Model } from 'sequelize';

export default class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        address: Sequelize.STRING,
        number: Sequelize.STRING,
        complement: Sequelize.STRING,
        district: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        zip: Sequelize.STRING,
        full_address: {
          type: Sequelize.VIRTUAL,
          get() {
            const isExistComplement = comp => comp && ` - ${comp}`;
            return `${this.address}, n° ${this.number}${isExistComplement(
              this.complement
            )}, ${this.district}, ${this.city}/${this.state} - ${this.zip}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}
