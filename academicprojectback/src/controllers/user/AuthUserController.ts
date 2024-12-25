import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";
class AuthUserController {
    async handle(req: Request, res: Response) {
	//console.log("chamou login");
        const { emailUsuario, senhaUsuario} = req.body;
        const authUserService = new AuthUserService();
        const auth = await authUserService.execute({
            email: emailUsuario,
            password: senhaUsuario
        })
        return res.json(auth);
    }
}
export { AuthUserController }