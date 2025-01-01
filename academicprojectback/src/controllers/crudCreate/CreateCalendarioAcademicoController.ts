import { Request, Response } from "express";
import { CreateCalendarioAcademicoService } from '../../services/crudCreate/CreateCalendarioAcademicoService';
class CreateCalendarioAcademicoController {
    async handle(req: Request, res: Response) {
        //console.log("chamou login");
        const { projetoID, descricao} = req.body;
        const createCalendarioAcademico = new CreateCalendarioAcademicoService();
        const CalendarioAcademico = await createCalendarioAcademico.execute({
            projetoID:projetoID,
            descricao:descricao
        })
        return res.json(CalendarioAcademico);
    }
}
export { CreateCalendarioAcademicoController }