import { Request, Response } from "express";
import { GetEquipeService } from "../../services/crudget/GetEquipeService";  
class GetEquipeController {
    async handle(req: Request, res: Response) {
        
        const equipeID = Number(req.query.equipeID);
       //console.log(`codigo de equipe passado: ${equipeID}`);
        if (isNaN(equipeID)) {
            return res.status(400).json({ error: "equipeID deve ser um número válido" });
        }
        
        const getEquipe= new GetEquipeService();
        const equipeDetalhe = await getEquipe.execute({
            equipeID:equipeID
        })
        return res.json(equipeDetalhe);
    }
}
export { GetEquipeController }