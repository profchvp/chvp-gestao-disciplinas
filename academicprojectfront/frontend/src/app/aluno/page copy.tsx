import { Equipes } from "./components/equipes";
import { api } from "@/services/api"
import { getCookiesServer } from "@/lib/cookieServer";
import { EquipeProps } from "@/lib/equipe.types";
async function getEquipes():Promise<EquipeProps|[]> {
    try {
        const token = await getCookiesServer();
        const response = await api.get("/equipes", {
            headers: {
                Authorization: `Baerer${token}`
            }
        })
        return response.data || []
    } catch (err) {
        console.log(err);
        return [];
    }
}
export default  async function aluno() {
    const equipes = await getEquipes();
    //console.log(equipes)
    return (
        <>
            <Equipes equipesx={equipes}/>
        </>
    )
}