import { Request, Response } from "express";
import { ListEquipesService } from "../../services/crudList/ListEquipesService";

class ListEquipesController {
    async handle(req: Request, res: Response) {
        const listEquipesService = new ListEquipesService();
        const equipes = await listEquipesService.execute();
        return res.json(equipes);
    }
}
export { ListEquipesController }