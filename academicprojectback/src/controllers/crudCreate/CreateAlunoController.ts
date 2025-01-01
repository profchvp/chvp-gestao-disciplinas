import { Request, Response } from "express";
import { CreateAlunoService } from "../../services/crudCreate/CreateAlunoService"; 
class CreateAlunoController {
    async handle(req: Request, res: Response) {
        //console.log("chamou AlunoEquipe");
        const { nomeAluno, registroAluno_RA, urlGitHUb, usuarioID, disciplinaID } = req.body;
        const createAluno= new CreateAlunoService();
        const aluno = await createAluno.execute({
            nomeAluno:nomeAluno, 
            registroAluno_RA:registroAluno_RA,
             urlGitHUb:urlGitHUb, 
             usuarioID:usuarioID, 
            disciplinaID:disciplinaID
        })
        return res.json(aluno);
    }
}
export { CreateAlunoController }