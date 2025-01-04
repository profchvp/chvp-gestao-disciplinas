

interface PapelUsuarioRequest {
    papelID: number;
}

class TesteService {
    async execute() {

        const campo1 = "valor1"
        const campo2 = "valor2"
        const campo3 = "valor3"
        const xData = {
            campo1,
            campo2,
            campo3
        };
        // Retorna o papel encontrado
        return {xData
        };
    }
}

export { TesteService };
