import { Request, Response } from "express";
import { CreateAlunoEquipeService } from '../../services/crudCreate/CreateAlunoEquipeService';
class CreateAlunoEquipeController {
    async handle(req: Request, res: Response) {
        console.log("chamou AlunoEquipe");
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