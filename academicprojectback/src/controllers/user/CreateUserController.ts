import { Request, response, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";
class CreateUserController {
    async handle(req: Request, res: Response) {
        const {emailUsuario, senhaUsuario,papelID}=req.body;
        const createUserervice = new CreateUserService();
        const user = await createUserervice.execute(
            {
             emailUsuario,
             senhaUsuario,
             papelID   
            }
        );
        return res.json(user)
    }
}
export { CreateUserController }
