import { Request, Response } from "express";
import { ListAlunoEquipeService } from "../../services/crudList/ListAlunoEquipeService"; 
class ListAlunoEquipeController {
    async handle(req: Request, res: Response) {
        const listAlunoEquipeService = new ListAlunoEquipeService();
        const alunoEquipe = await listAlunoEquipeService.execute();
        return res.json(alunoEquipe);
    }
}
export { ListAlunoEquipeController }