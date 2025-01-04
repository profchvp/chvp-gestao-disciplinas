import { Request, Response } from "express";
import { TesteService } from "../services/testeService";  
class TesteController {
    async handle(req: Request, res: Response) {
        const { papelID} = req.body;
        
        const testeService = new TesteService();
        const teste = await testeService.execute();
       
        return res.json(teste)
    }
}
export {TesteController}