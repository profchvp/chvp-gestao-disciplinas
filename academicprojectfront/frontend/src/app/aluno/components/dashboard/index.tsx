"use server";

import { DadosEquipe } from "./dadosequipe";
import { ComposicaoEquipe } from "./composicaoequipe";
import { DetalheEquipeProps } from "@/lib/detalheEquipe.types";
import { ComposicaoEquipeProps } from "@/lib/composicaoequipe.types";
import { api } from "@/services/api";
import { cookies } from 'next/headers';
import DashboardClient from "../dashboarClient";
import { CalendarioEquipe } from "./calendarioequipe";
import { CalendarioProjetoProps } from "@/lib/calendarioequipe.types";

async function getEquipeAluno() {
  const cookieStore = await cookies();
  try {

    const cookiex = cookieStore.get("session_aluno")?.value;
    if (cookiex) {
      const parsedCookie = JSON.parse(cookiex);
      var alunoID = parsedCookie.alunoID
    } else {
      console.log("O cookie 'session_aluno' não foi encontrado.");
    }

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
async function getEquipe(equipeID: number): Promise<DetalheEquipeProps | null> {

  try {
    const response = await api.get("/getequipe", {
      params: { equipeID }
    })

    return response.data
  } catch (err) {
    console.log(err);

    return null
  }
}
async function getComposicaoEquipe(equipeID: number): Promise<ComposicaoEquipeProps | []> {
  // alert(`fara acesso com:${equipeID}` )
  try {
    const response = await api.get("/getcomposicaoequipe", {
      params: { equipeID }
    })
    return response.data
    // Exibe cada elemento no console
    response.data.forEach((data) => {
      console.log(`Data do Evento: ${data.dataEvento}, Descrição do Evento: ${data.descricaoEvento}`);
    });
  } catch (err) {
    console.log(err);
    return []
  }
}
async function getCalendarioEquipe(equipeID: number): Promise<CalendarioProjetoProps | []> {
  try {
    const response = await api.get("/getadatasprojeto", {
      params: { equipeID }
    });

    // Processa e retorna os dados recuperados
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}
export default async function Dashboard() {
  const equipeID:number = await getEquipeAluno();
  //alert(equipeID)
  const equipe = await getEquipe(equipeID);
  const composicaoEquipe = await getComposicaoEquipe(equipeID);
  const calendarioEquipe = await getCalendarioEquipe(equipeID)
  
  return (
    <>
      <main>
        <DadosEquipe equipe={equipe} />
        <ComposicaoEquipe equipeComposicao={composicaoEquipe} />
        <CalendarioEquipe calendarioProjeto={calendarioEquipe} />
        {/* Inclui a parte do cliente */}
        <DashboardClient />
      </main>
    </>
  );
}
export { Dashboard }
