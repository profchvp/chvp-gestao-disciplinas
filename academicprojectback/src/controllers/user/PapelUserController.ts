import { Request, Response } from "express";
import { PapelUserService } from "../../services/user/PapelUserService";

class PapelUserController {
    async handle(req: Request, res: Response) {
        const { papelID} = req.body;
        //console.log(`user_id recuperado: ${user_id}`)
        const papelUserService = new PapelUserService();
        const papelUser = await papelUserService.execute({papelID});
        return res.json(papelUser)
    }
}
export {PapelUserController}