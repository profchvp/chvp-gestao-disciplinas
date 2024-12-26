import { Request, Response } from "express";
import { CreateAlunoEquipeService } from '../../services/crud/CreateAlunoEquipeService';
class CreateAlunoEquipeController {
    async handle(req: Request, res: Response) {
        //console.log("chamou login");
        const { alunoID, equipeID, papeis} = req.body;
        const createAlunoEquipe = new CreateAlunoEquipeService();
        const AlunoEquipe = await createAlunoEquipe.execute({
            alunoID:alunoID,
            equipeID:equipeID,
            papeis:papeis
        })
        return res.json(AlunoEquipe);
    }
}
export { CreateAlunoEquipeController }