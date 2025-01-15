//"use client";

import { DadosEquipe } from "./dadosequipe";
import { ComposicaoEquipe } from "./composicaoequipe";
import { DetalheEquipeProps } from "@/lib/detalheEquipe.types";
import { ComposicaoEquipeProps } from "@/lib/composicaoequipe.types";
import { api } from "@/services/api";
import Cookies from "js-cookie";
import DashboardClient from "../dashboarClient";
async function getEquipeAluno(){
try {
        const sessionData = Cookies.get("session_aluno");
        if (!sessionData) {
          console.error("Dados da sessão não encontrados.");
          return;
        }

        const { alunoID } = JSON.parse(sessionData);
        const response = await api.get("/getalunoequipe", {
          params: { alunoID },
        });

       //return response.data.equipeID;
       const equipeID = response.data.equipeID;

       // Verifica se equipeID é um número e converte se necessário
       if (isNaN(equipeID)) {
           console.error("equipeID não é um número.");
           return;
       }

       return Number(equipeID);
      } catch (error) {
        console.error("Erro ao verificar status do aluno:", error);
      }
}
async function getEquipe(equipeID:number): Promise<DetalheEquipeProps | null > {
  
  try {
    const response = await api.get("/getequipe",{
      params:{equipeID }})
      //alert("OK")
    return response.data  
  } catch (err) {
    console.log(err);
    return null
  }
}
async function getComposicaoEquipe(equipeID:number): Promise<ComposicaoEquipeProps | [] > {
 // alert(`fara acesso com:${equipeID}` )
  try {
    const response = await api.get("/getcomposicaoequipe",{
      params:{equipeID }})
    return response.data  
  } catch (err) {
    console.log(err);
    return []
  }
}
export default async function Dashboard() {
  const equipeID:number = await getEquipeAluno();
  //alert(equipeID)
  const equipe:number = await getEquipe(equipeID);
  const composicaoEquipe = await getComposicaoEquipe(equipeID);

  return (
    <>
      <main>
        <DadosEquipe equipe={equipe} />
        <ComposicaoEquipe equipeComposicao={composicaoEquipe} />
        
        {/* Inclui a parte do cliente */}
        <DashboardClient />
      </main>
    </>
  );
}
export { Dashboard }
