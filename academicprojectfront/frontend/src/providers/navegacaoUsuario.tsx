"use client"
/**
 * Este COMPONENTE contem um "provider" o MODAL de EQUIPES 
 */
import { createContext, useState, ReactNode } from "react";
import Cookies from 'js-cookie'; // Importação da biblioteca js-cookie
// Definindo o contexto
interface NavegacaoContextData {
  inicializarNavegacao: (token: string, alunoID: number, nomeAluno: string, perfil: string, registroAluno_ID:string) => void;
  isNavegacaoAtiva: boolean;
}

export const NavegacaoContext = createContext<NavegacaoContextData | null>(null);

// Provider para o contexto
interface NavegacaoProviderProps {
  children: ReactNode;
}

export const NavegacaoProvider = ({ children }: NavegacaoProviderProps) => {
  const [isNavegacaoAtiva, setIsNavegacaoAtiva] = useState(false);

  // Função para inicializar a navegação
  const inicializarNavegacao = (token: string, alunoID: number, nomeAluno: string, perfil: string, registroAluno_ID:string) => {
    setIsNavegacaoAtiva(true);
    const expressTime = 60 * 60 * 24 * 30 * 1000;
    //alert(perfil)
    //alert(registroAluno_ID)
    if (perfil === 'aluno') {
      const sessionData = {
        alunoID,
        nomeAluno,
        registroAluno_ID,
        token
      };
      // Salva o token no cookie usando js-cookie
      //Cookies.set("session_aluno", token, {
      Cookies.set("session_aluno", JSON.stringify(sessionData), {
        expires: expressTime, // Define a expiração em dias
        path: "/",
        secure: process.env.NODE_ENV === "production", // Somente HTTPS em produção
      });
    } else {
      // Salva o token no cookie usando js-cookie
      Cookies.set("session_admin", token, {
        expires: expressTime, // Define a expiração em dias
        path: "/",
        secure: process.env.NODE_ENV === "production", // Somente HTTPS em produção
      });

    }
    console.log('Token armazenado no cookie:', token);
    console.log("Navegação inicializada!");
  };

  return (
    <NavegacaoContext.Provider
      value={{
        inicializarNavegacao,
        isNavegacaoAtiva,
      }}
    >
      {children}
    </NavegacaoContext.Provider>
  );
};
