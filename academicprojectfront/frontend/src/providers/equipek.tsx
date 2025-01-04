"use client"
/**
 * Este COMPONENTE contem um "provider" o MODAL de EQUIPES 
 */
import { createContext, ReactNode, useState } from "react"
import { api } from '@/services/api'
import { getCookieClient } from "@/lib/cookieClient"
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie'; // Importação da biblioteca js-cookie
interface EquipeProps {
    equipeID: number;
    nomeEquipe: string;
    alunoID: number;
    nomeProfessorOrientador: string;
    temaProjeto: string;
    descricaoProjeto: string;
    gitHubEquipe: string;
    projetoID: number;

    filiacaoEquipe: (equipe_ID: number, aluno_IDx: number, papeisSelecionado: []) => Promise<void>;
}
type EquipeContextData = {
    isOpen: boolean;
    onRequestOpen: (equipe_id: number) => Promise<void>;
    onRequestClose: () => void;
    equipe: EquipeProps;
}
/**
 * tipagem pedida pelo REACT
 */
type EquipeProviderProps = {
    children: ReactNode;
}

export const EquipeContext = createContext({} as EquipeContextData)

/*---------------------------------------------------------------------------*
 *          Aqui está o Provider da EQUIPE
 * @param param0 
 * @returns 
 *---------------------------------------------------------------------------*/
export function EquipeProvider({ children }: EquipeProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [equipe, setEquipe] = useState<EquipeProps>()
    const router = useRouter()


    async function onRequestOpen(equipe_id: number) {
        toast.success("entrou em  onRequestOpen....")
        const token = getCookieClient();
        // alert(token)
        // alert("Fazer chamada")
        // alert(equipe_id)
        const response = await api.post(`/detalheequipe`, {
            equipeID: equipe_id
        });
        //alert(response.data.nomeEquipe)
        setEquipe(response.data)
        setIsOpen(true);
    }
    function onRequestClose() {
        setIsOpen(false);
    }
    async function filiacaoEquipe(equipe_ID: number, aluno_IDx: number, papeisSelecionado: []) {
        try {
            const sessionData = Cookies.get("session_aluno");
            if (!sessionData) throw new Error("Dados da sessão não encontrados.");

            const { alunoID } = JSON.parse(sessionData);

            const data = {
                alunoID: alunoID,
                equipeID: equipe_ID,
                papeis: papeisSelecionado
            };

            const token = getCookieClient();
            console.log("Conteúdo de data (formatado):", JSON.stringify(data, null, 2));

            await api.post(`/alunoequipe`, data);

            toast.success("Filiação à equipe feita com sucesso");
            setIsOpen(false)
             // Redireciona para a página do aluno após o sucesso
             router.push('/aluno');

        } catch (err) {
            console.error("Erro na filiação:", err);
            toast.error("Falha na filiação à equipe");
        }
    }

    //RETORNO do Provider
    return (
        <EquipeContext.Provider
            value={{
                isOpen,
                onRequestOpen,
                onRequestClose,
                filiacaoEquipe,
                equipe
            }}
        >
            {children}
        </EquipeContext.Provider>
    )
}