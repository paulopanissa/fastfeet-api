import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().required(),
        password: Yup.string()
          .required()
          .min(6),
      });

      if (!(await schema.isValid(req.body))) {
        return res.json(400).json({ error: 'Validation fails' });
      }
      const { email, password } = req.body;

      const users = await User.findAll();

      console.log(users);

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(401).json({ error: 'User not found.' });
      }

      if (!(await user.checkPassword(password))) {
        return res.status(401).json({ error: 'Password does not match.' });
      }

      const { id, name } = user;

      const token = jwt.sign({ id, name }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      });

      return res.json({
        user: {
          id,
          name,
          email,
        },
        token,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json(e);
    }
  }
}

export default new SessionController();
