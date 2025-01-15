"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";

export default function DashboardClient() {
  const [showButton, setShowButton] = useState(false); // Controla a exibição do botão
  const router = useRouter();

  useEffect(() => {
    async function fetchAlunoStatus() {
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

        // Aluno está em equipe (não deve redirecionar para outra página).
        setShowButton(response.data !== null);
      } catch (error) {
        console.error("Erro ao verificar status do aluno:", error);
      }
    }

    fetchAlunoStatus();
  }, []);

  async function handleFiliar(event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário.

    try {
      const sessionData = Cookies.get("session_aluno");
      if (!sessionData) {
        throw new Error("Dados da sessão não encontrados.");
      }

      const { alunoID } = JSON.parse(sessionData);
      const response = await api.get("/getalunoequipe", {
        params: { alunoID },
      });

      if (response.data === null) {
        // Redireciona caso o aluno não esteja em uma equipe
        router.push("/aluno/equipes");
      } else {
        alert("Aluno já está em uma equipe.");
      }
    } catch (error) {
      console.error("Erro ao filiar-se à equipe:", error);
    }
  }

  return (
    <>
      {!showButton && (
        <form onSubmit={handleFiliar}>
          <button type="submit">Filiar-se à Equipe</button>
        </form>
      )}
    </>
  );
}
