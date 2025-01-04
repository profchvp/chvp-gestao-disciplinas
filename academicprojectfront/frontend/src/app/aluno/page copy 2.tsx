/**
import {Dashboard} from "./dashboard/index"
export default async function aluno() {

  return (
    <>
      <>
        <Dashboard  />
      </>
    </>
  )
}
-------------------------------------------------------------------   */

import { Dashboard } from "./components/dashboard";
import { Filiacao } from "./components/filiacao";
import Cookies from "js-cookie";
import axios from "axios";

export default async function AlunoPage() {
  // 1. Obter o código do aluno do Cookie "session_aluno"
  const sessionData = Cookies.get("session_aluno");
  //xxxxxxxxxxxxxxxxxxxxxx const sessionData = Cookies.get("session_aluno");
  if (!sessionData) {
    return
  }

  const { alunoID } = JSON.parse(sessionData);

  const data = {
    alunoID: alunoID,
   
  };
  console.log("OK")
  //xxxxxxxxxxxxxxxxxxxxxx
  if (!alunoID) {
    return <div>Erro: Aluno não autenticado.</div>;
  }

  /*
  try {
    // 2. Verificar se o aluno já foi afiliado a uma equipe
    console.log("chamad aluoequipe")
    alert("OK")
    const response = await axios.get("/getalunoequipe", {
      params: { alunoID },
    });

    // 3. Renderizar o Dashboard se o aluno estiver afiliado
    if (response.status === 200 && response.data.afiliado) {
      return (
        <>
          <Dashboard />
        </>
      );
    }
  } catch (error) {
    console.error("Erro ao verificar afiliação do aluno:", error);
    return <div>Erro ao carregar os dados do aluno.</div>;
  }
*/
  // 4. Renderizar Modal se o aluno não estiver afiliado
  return (
    <>
      <Filiacao />

    </>
  );
}
