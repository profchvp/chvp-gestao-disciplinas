
import { Header } from "./components/header"
import { EquipeProvider } from "@/providers/equipek"
import Cookies from 'js-cookie'; // Importação da biblioteca js-cookie
import { cookies } from 'next/headers';
async function getAlunoNavegacao() {

    const cookieStore = await cookies();
    const cookiex  = cookieStore.get("session_aluno")?.value;
    console.log("Valor bruto do cookie (string JSON):", cookiex);

    if (cookiex) {
        try {
            const parsedCookie = JSON.parse(cookiex);

            // Retornando apenas alunoID e nomeAluno
            const result = {
                alunoID: parsedCookie.alunoID || 0,
                nomeAluno: parsedCookie.nomeAluno || "Anônimo",
                registroAluno_ID: parsedCookie.registroAluno_ID || "Anônimo",
            };

            console.log("Estrutura retornada:", result);
            return result;
        } catch (error) {
            console.error("Erro ao analisar o cookie:", error);
            return {
                alunoID: 0,
                nomeAluno: "Anônimo",
            };
        }
    } else {
        console.log("O cookie 'session_aluno' não foi encontrado.");
        return {
            alunoID: 0,
            nomeAluno: "Anônimo",
        };
    }
}
export default async function AppLayout({ children }:
    { children: React.ReactNode }) {
    const alunoNavegacao = await getAlunoNavegacao();
   
    return (
        <>
            <Header AlunoNavegacao={alunoNavegacao} />
            <EquipeProvider>
                {children}
            </EquipeProvider>
        </>
    )
}
