import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';

// Controllers
import SessionController from './app/controllers/SessionController';
import ProfileController from './app/controllers/ProfileController';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.get('/', (req, res) => {
  const array = [
    { message: 'Seja bem vindo ao Fastfeet' },
    {
      routes: {
        'no-auth': [
          {
            sessions: 'Rota para fazer Login',
          },
        ],
        auth: [],
      },
    },
  ];
  return res.status(200).json(array);
});

/**
 * Session Routes
 */
routes.post('/sessions', SessionController.store);

/**
 * Middleware Auth
 */
routes.use(authMiddleware);

// User
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.delete('/users/:id', UserController.destroy);
// Profile
routes.get('/profile', ProfileController.show);
routes.put('/profile', ProfileController.update);

export default routes;
