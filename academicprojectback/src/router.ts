import {Router, Request, Response} from 'express';
import {CreateUserController} from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController';
import { UserDetailController } from './controllers/user/UserDetailController';
import { CreatePeriodoAcademicoController } from './controllers/crud/CreatePeriodoAcademicoController';
import { CreateDisciplinaController } from './controllers/crud/CreateDisciplinaController';
import { CreateProjetoController } from './controllers/crud/CreateProjetoController';
import { CreateEquipeController } from './controllers/crud/CreateEquipeController';
import { CreateAlunoEquipeController } from './controllers/crud/CreateAlunoEquipeController';
import { CreateCalendarioAcademicoController } from './controllers/crud/CreateCalendarioAcademicoController';
import { CreateDatasCalendarioController } from './controllers/crud/CreateDatasCalendarioController';
import { PapelUserController } from './controllers/user/PapelUserController';

import { isAuthenticated } from './middlewares/isAuthenticated';
const router = Router();

router.post('/user', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated,new UserDetailController().handle)

//CRUDs
router.post('/periodoacademico',new CreatePeriodoAcademicoController().handle)
router.post('/disciplina',new CreateDisciplinaController().handle)
router.post('/projeto',new CreateProjetoController().handle)
router.post('/equipe',new CreateEquipeController().handle)
router.post('/alunoequipe',new CreateAlunoEquipeController().handle)
router.post('/calendarioacademico',new CreateCalendarioAcademicoController().handle)
router.post('/datascalendario',new CreateDatasCalendarioController().handle)
router.post('/papelusuario',new PapelUserController().handle)
export {router};
