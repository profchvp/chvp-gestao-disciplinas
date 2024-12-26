import { Request, Response } from "express";
import { CreatePeriodoAcademicoService } from '../../services/crud/CreatePeriodoAcademicoService' ;
class CreatePeriodoAcademicoController {
    async handle(req: Request, res: Response) {
	//console.log("chamou login");
        const { tipoPeriodoAcademico, anoSemestre} = req.body;
        const createPeriodoAcademico = new CreatePeriodoAcademicoService();
        const periodoAcademico = await createPeriodoAcademico.execute({
            tipoPeriodoAcademico:tipoPeriodoAcademico, 
            anoSemestre:anoSemestre
        })
        return res.json(periodoAcademico);
    }
}
export { CreatePeriodoAcademicoController }