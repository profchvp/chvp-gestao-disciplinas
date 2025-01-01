import { Request, Response } from "express";
import { CreateProjetoService } from '../../services/crudCreate/CreateProjetoService';
class CreateProjetoController {
    async handle(req: Request, res: Response) {
        //console.log("chamou login");
        const { descricao, periodoAcademicoID, disciplinaID } = req.body;
        const createProjeto = new CreateProjetoService();
        const Projeto = await createProjeto.execute({
            descricao:descricao,
            periodoAcademicoID:periodoAcademicoID,
            disciplinaID:disciplinaID
        })
        return res.json(Projeto);
    }
}
export { CreateProjetoController }