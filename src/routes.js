import { Router } from 'express';

import UserController from './app/Controllers/UserController';
import SessionController from './app/Controllers/SessionController';

import UserStoreValidator from './app/Validators/UserStoreValidator';
import SessionStoreValidator from './app/Validators/SessionStoreValidator';

const routes = new Router();

routes.post('/users', UserStoreValidator, UserController.store);

routes.post('/sessions', SessionStoreValidator, SessionController.store);

export default routes;
