import { Request, Response } from "express";
import { DetalheEquipeService } from "../../services/crudDetalhe/DetalheEquipeService";

class DetalheEquipesController {
    async handle(req: Request, res: Response) {
    
        const { equipeID} = req.body;
        const detalheEquipe = new DetalheEquipeService();
        const equipe = await detalheEquipe.execute({
            equipeID:equipeID
        })
        return res.json(equipe);
    }
}
export { DetalheEquipesController }