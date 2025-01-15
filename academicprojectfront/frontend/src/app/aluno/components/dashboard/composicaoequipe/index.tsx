
import React from 'react';
import { ComposicaoEquipeProps } from '@/lib/composicaoequipe.types';
interface ComposicaoProps {
    equipeComposicao: ComposicaoEquipeProps[] ;
    //<p>Membros da Equipe: {equipe.membros.join(', ')}</p>

}
export async function ComposicaoEquipe({ equipeComposicao }: ComposicaoProps) {
    if (!Array.isArray(equipeComposicao)) {
        return <div>Dados da equipe não disponíveis.</div>;
    }

    return (
        <div>
            <h2>Composicao da Equipe</h2>
            {equipeComposicao.map((membro, index) => (
                <div key={index}>
                    <h3>{membro.nomeAluno}</h3>
                    <ul>
                        {membro.papeis.map((papel, papelIndex) => (
                            <li key={papelIndex}>{papel}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
