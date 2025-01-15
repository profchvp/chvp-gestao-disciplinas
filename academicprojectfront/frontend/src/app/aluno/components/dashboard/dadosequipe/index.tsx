import React from 'react';
import { DetalheEquipeProps } from '@/lib/detalheEquipe.types';
interface EquipeProps {
    equipe: DetalheEquipeProps | null;
    //<p>Membros da Equipe: {equipe.membros.join(', ')}</p>

}
export async function DadosEquipe({ equipe }: EquipeProps) {
    //const nome="equipe1"

    return (
        <div>
            <h2>Dados da Equipe</h2>
            <p>Nome da Equipe: {equipe?.nomeEquipe||"descricao nao disponivel"}</p>
            <p>Tema do Projeto: {equipe?.temaProjeto||"descricao nao disponivel"}</p>
            <p>Descricao Projeto: {equipe?.descricaoProjeto||"descricao nao disponivel"}</p>
            <p>Orientador(a) da Equipe: Prof(a). {equipe?.nomeProfessorOrientador||"descricao nao disponivel"}</p>
            <p>Gerente da Equipe: {equipe?.alunoGerente||"descricao nao disponivel"}</p>
            <p>GitHub da Equipe: {equipe?.gitHubEquipe||"descricao nao disponivel"}</p>
           
        </div>
    )
}
