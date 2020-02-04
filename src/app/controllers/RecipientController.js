import * as Yup from 'yup';
import Recipient from '../models/Recipient';
import pagination from '../../utils/paginate';

class RecipientController {
  async index(req, res) {
    const { page = 1, limit = 20, q = null } = req.query;

    const where = q
      ? {
          name: {
            [Op.iLike]: `%${q}%`,
          },
        }
      : null;

    const { rows, count } = await Recipient.findAndCountAll({
      where,
      order: [['created_at', 'DESC']],
      limit,
      offset: (page - 1) * limit,
      attributes: [
        'id',
        'name',
        'address',
        'number',
        'complement',
        'district',
        'city',
        'state',
        'zip',
        'full_address',
      ],
    });

    const paginate = pagination(count, page, limit);

    return res.json({ data: rows, paginate });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.string().required(),
      number: Yup.string().required(),
      district: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      zip: Yup.string().required(),
    });

    const data = req.body;

    if (!(await schema.isValid(data))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipient = await Recipient.create(data);

    // console.log(recipient);

    return res.status(202).json(recipient);
  }

  async show(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id, {
      attributes: [
        'id',
        'name',
        'address',
        'number',
        'complement',
        'district',
        'city',
        'state',
        'zip',
        'full_address',
      ],
    });

    return res.status(200).json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      address: Yup.string(),
      number: Yup.string(),
      district: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      zip: Yup.string(),
    });

    const { id } = req.params;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipient = await Recipient.findByPk(id);

    await recipient.update(req.body);

    return res
      .status(200)
      .json({ message: 'Recipient update was successful', data: recipient });
  }

  async destroy(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.destroy({
      where: {
        id,
      },
    });

    if (!recipient) {
      return res.status(400).json({ message: 'Oops, it was bad.' });
    }
    return res
      .status(200)
      .json({ message: 'Recipient deletion was successful' });
  }
}

export default new RecipientController();
