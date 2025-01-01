"use client";

import styles from './styles.module.scss';
import { X } from 'lucide-react';
import { use, useState } from 'react';
import { EquipeContext } from '@/providers/equipek';
import { toast } from "sonner";
export function ModalEquipe() {
    const { onRequestClose, equipe, filiacaoEquipe } = use(EquipeContext);
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

    const roles = ["Papel1", "Papel2", "Papel3", "Papel4", "Papel5"];

    const handleRoleSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const options = event.target.options;
        const selected: string[] = [];

        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selected.push(options[i].value);
            }
        }

        setSelectedRoles(selected);
    };

    async function handleFiliar() {
        if (selectedRoles.length === 0) {
           // alert("Por favor, selecione ao menos um papel antes de continuar.");
           toast.error("Por favor, selecione ao menos um papel antes de continuar.")
            return;
        }

        await filiacaoEquipe(equipe.equipeID, equipe.alunoID,selectedRoles);
    }

    return (
        <dialog className={styles.dialogContainer}>
            <section className={styles.dialogContent}>
                <button className={styles.dialogBack} onClick={onRequestClose}>
                    <X size={40} color="#ff3f4b" />
                </button>
                <article className={styles.container}>
                    <h2>Filiação na Equipe</h2>
                    <div className={styles.detalheEquipe}>
                        <span className={styles.equipe}>
                            <span className={styles.labels}>Equipe:</span> <b>{equipe.nomeEquipe}</b>
                        </span>
                        <span className={styles.equipe}>
                            <span className={styles.labels}>Tema:</span> <b>{equipe.temaProjeto}</b>
                        </span>
                        <span className={styles.equipe}>
                            <span className={styles.labels}>Prof. Orientador:</span> <b>{equipe.nomeProfessorOrientador}</b>
                        </span>
                        <span className={styles.equipe}>
                            <span className={styles.labels}>Descrição do Tema:</span> <b>{equipe.descricaoProjeto}</b>
                        </span>
                        <span className={styles.equipe}>
                            <span className={styles.labels}>GitHub da Equipe:</span> <b>{equipe.gitHubEquipe}</b>
                        </span>
                    </div>
                    <div className={styles.selectContainer}>
                        <label htmlFor="roles">Selecione os papéis:</label>
                        <select
                            id="roles"
                            multiple
                            className={styles.select}
                            onChange={handleRoleSelection}
                        >
                            {roles.map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                    </div>
                </article>
                <div className={styles.containerButton}>
                    <button className={styles.buttonEquipe} onClick={handleFiliar}>
                        Filiar-se
                    </button>
                </div>
            </section>
        </dialog>
    );
}
