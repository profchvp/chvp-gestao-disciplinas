import { Request, Response } from "express";
import { GetAlunoEquipeService } from "../../services/crudget/GetAlunoEquipeService"; 
class GetAlunoEquipeController {
    async handle(req: Request, res: Response) {
        
        const alunoID = Number(req.query.alunoID);
       // console.log(`codigo de aluno passado: ${alunoID}`);
        if (isNaN(alunoID)) {
            return res.status(400).json({ error: "alunoID deve ser um número válido" });
        }
        
        const getAlunoEquipe= new GetAlunoEquipeService();
        const alunoEquipe = await getAlunoEquipe.execute({
            alunoID:alunoID
        })
        return res.json(alunoEquipe);
    }
}
export { GetAlunoEquipeController }