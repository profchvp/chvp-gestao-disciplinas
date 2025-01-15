
import React from 'react';
import { CalendarioProjetoProps } from '@/lib/calendarioequipe.types'; 
interface CalendarioProps {
    calendarioProjeto: CalendarioProjetoProps[] ;
    
}
export async function CalendarioEquipe({ calendarioProjeto }: CalendarioProps) {
    if (!calendarioProjeto || calendarioProjeto.length === 0) {
        return <div>Nenhum evento encontrado.</div>;
    }

    return (
        <div>
            <h2>Calendário da Equipe</h2>
            <ul>
                {calendarioProjeto.map((evento, index) => (
                    <li key={index}>
                        <strong>Data:</strong> {new Date(evento.dataEvento).toLocaleDateString()}-
                         {evento.descricaoEvento}
                    </li>
                ))}
            </ul>
        </div>
    );
  }
