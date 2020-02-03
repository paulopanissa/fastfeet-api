import * as Yup from 'yup';
import User from '../models/User';
import pagination from '../../utils/paginate';

class UserController {
  async index(req, res) {
    const { page = 1, limit = 20, q = null } = req.query;

    const where = q
      ? {
          name: {
            [Op.iLike]: `%${q}%`,
          },
        }
      : null;

    const { rows, count } = await User.findAndCountAll({
      where,
      order: [['created_at', 'DESC']],
      limit,
      offset: (page - 1) * limit,
      attributes: ['id', 'name', 'email'],
    });

    const paginate = pagination(count, page, limit);

    return res.json({ data: rows, paginate });
  }

  async show(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: ['id', 'name', 'email'],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.json(user);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists. ' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async destroy(req, res) {
    const { id } = req.params;

    const remove = await User.destroy({
      where: { id },
    });

    if (!remove) {
      return res.status(400).json({ message: 'Oops, it was bad.' });
    }
    return res.status(200).json({ message: 'User deletion was successful' });
  }
}

export default new UserController();
