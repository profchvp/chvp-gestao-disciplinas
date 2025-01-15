import { Request, Response } from "express";
import { GetDatasProjetoService } from "../../services/crudget/GetDatasProjetoService"; 
class GetDatasProjetoController {
    async handle(req: Request, res: Response) {
        
        const equipeID = Number(req.query.equipeID);
       // console.log(`codigo de aluno passado: ${alunoID}`);
        if (isNaN(equipeID)) {
            return res.status(400).json({ error: "equipeID deve ser um número válido" });
        }
        
        const getDatasProjeto= new GetDatasProjetoService;
        const datasProjeto = await getDatasProjeto.execute({
            equipeID:equipeID
        })
        // Exibe cada elemento no console
    datasProjeto.forEach((data) => {
        console.log(`Data do Evento: ${data.dataEvento}, Descrição do Evento: ${data.descricaoEvento}`);
      });
        return res.json(datasProjeto);
    }
}
export { GetDatasProjetoController }