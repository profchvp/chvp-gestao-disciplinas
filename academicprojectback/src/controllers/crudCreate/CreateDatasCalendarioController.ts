import { Request, Response } from "express";
import { CreateDatasCalendarioService } from '../../services/crudCreate/CreateDatasCalendarioService';
class CreateDatasCalendarioController {
    async handle(req: Request, res: Response) {
        //console.log("chamou login");
        const { dataEvento, descricaoEvento, calendarioID} = req.body;
        const createDatasCalendario = new CreateDatasCalendarioService();
        const DatasCalendario = await createDatasCalendario.execute({
            dataEvento,
            descricaoEvento,
            calendarioID
        })
        return res.json(DatasCalendario);
    }
}
export { CreateDatasCalendarioController }