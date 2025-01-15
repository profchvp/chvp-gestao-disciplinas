import { Request, Response } from "express";
import { UserReadService } from "../../services/user/UserReadService";  
class UserReadController {
    async handle(req: Request, res: Response) {
        
        const emailUsuario = String(req.query.emailUsuario);
               
        const getUsuario= new UserReadService();
        const usuario = await getUsuario.execute({
            emailUsuario:emailUsuario
        })
        return res.json(usuario);
    }
}
export { UserReadController }