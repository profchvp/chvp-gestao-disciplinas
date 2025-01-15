import { Request, Response } from "express";
import { GetComposicaoEquipeService } from "../../services/crudget/GetComposicaoEquipeService";  
class GetComposicaoEquipeController {
    async handle(req: Request, res: Response) {
        
        const equipeID = Number(req.query.equipeID);
       // console.log(`codigo de aluno passado: ${alunoID}`);
        if (isNaN(equipeID)) {
            return res.status(400).json({ error: "equipeID deve ser um número válido" });
        }
        
        const getComposicaoEquipe= new GetComposicaoEquipeService;
        const alunoEquipe = await getComposicaoEquipe.execute({
            equipeID:equipeID
        })
        return res.json(alunoEquipe);
    }
}
export { GetComposicaoEquipeController }