import { Router } from 'express';

import UserController from './app/Controllers/UserController';

import UserStoreValidator from './app/Validators/UserStoreValidator';

const routes = new Router();

routes.post('/users', UserStoreValidator, UserController.store);

export default routes;
