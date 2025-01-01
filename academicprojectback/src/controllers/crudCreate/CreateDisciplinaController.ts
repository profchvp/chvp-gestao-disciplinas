import { Request, Response } from "express";
import { CreateDisciplinaService } from '../../services/crudCreate/CreateDisciplinaService';
class CreateDisciplinaController {
    async handle(req: Request, res: Response) {
        //console.log("chamou login");
        const { nomeDisciplina, nomeCursoDisciplina, nomeTurma, turnoTurma, professorID } = req.body;
        const createDisciplina = new CreateDisciplinaService();
        const Disciplina = await createDisciplina.execute({
            nomeDisciplina: nomeDisciplina,
            nomeCursoDisciplina: nomeCursoDisciplina,
            nomeTurma: nomeTurma,
            turnoTurma: turnoTurma,
            professorID: professorID
        })
        return res.json(Disciplina);
    }
}
export { CreateDisciplinaController }