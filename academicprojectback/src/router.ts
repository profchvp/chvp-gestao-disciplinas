import {Router, Request, Response} from 'express';
import {CreateUserController} from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController';
import { UserDetailController } from './controllers/user/UserDetailController';
import { CreatePeriodoAcademicoController } from './controllers/crudCreate/CreatePeriodoAcademicoController';
import { CreateDisciplinaController } from './controllers/crudCreate/CreateDisciplinaController';
import { CreateProjetoController } from './controllers/crudCreate/CreateProjetoController';
import { CreateEquipeController } from './controllers/crudCreate/CreateEquipeController';
import { CreateAlunoEquipeController } from './controllers/crudCreate/CreateAlunoEquipeController';
import { CreateCalendarioAcademicoController } from './controllers/crudCreate/CreateCalendarioAcademicoController';
import { CreateDatasCalendarioController } from './controllers/crudCreate/CreateDatasCalendarioController';
import { PapelUserController } from './controllers/user/PapelUserController';
import { ListEquipesController } from './controllers/crudList/ListEquipesController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { DetalheEquipesController } from './controllers/cruddetalhe/DetalheEquipeController';
import { ListAlunoEquipeController } from './controllers/crudList/ListAlunoEquipeController';
import { CreateAlunoController } from './controllers/crudCreate/CreateAlunoController';
import { GetAlunoEquipeController } from './controllers/crudget/GetAlunoEquipeController';
import { TesteController } from './controllers/TesteController';
const router = Router();

router.post('/user', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated,new UserDetailController().handle)

//CRUDs CREATE
router.post('/periodoacademico',new CreatePeriodoAcademicoController().handle)
router.post('/disciplina',new CreateDisciplinaController().handle)
router.post('/projeto',new CreateProjetoController().handle)
router.post('/equipe',new CreateEquipeController().handle)
router.post('/alunoequipe',new CreateAlunoEquipeController().handle)
router.post('/calendarioacademico',new CreateCalendarioAcademicoController().handle)
router.post('/datascalendario',new CreateDatasCalendarioController().handle)
//router.post('/papelusuario',new PapelUserController().handle)
router.post('/papelusuario',new PapelUserController().handle)
//CRUDs CREATE
router.get('/equipes',new ListEquipesController().handle);
router.post('/detalheequipe', new DetalheEquipesController().handle)
router.post('/createaluno',new CreateAlunoController().handle)

//CRUDs Get
router.get('/getalunoequipe', new GetAlunoEquipeController().handle)


//TESTE
router.get('/teste', new TesteController().handle)
export {router};
