import {Router, Request, Response} from 'express';
import {CreateUserController} from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController';
import { UserDetailController } from './controllers/user/UserDetailController';

import { isAuthenticated } from './middlewares/isAuthenticated';
const router = Router();

router.post('/user', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated,new UserDetailController().handle)



export {router};
