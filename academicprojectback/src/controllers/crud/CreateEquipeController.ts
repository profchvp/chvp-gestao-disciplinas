import { Request, Response } from "express";
import { CreateEquipeService } from '../../services/crud/CreateEquipeService';
class CreateEquipeController {
    async handle(req: Request, res: Response) {
        //console.log("chamou login");
        const { nomeEquipe, alunoID, professorID, temaProjeto, descricaoProjeto, gitHubEquipe, projetoID } = req.body;
        const createEquipe = new CreateEquipeService();
        const Equipe = await createEquipe.execute({
            nomeEquipe,
            alunoID,
            professorID,
            temaProjeto,
            descricaoProjeto,
            gitHubEquipe,
            projetoID
        })
        return res.json(Equipe);
    }
}
export { CreateEquipeController }