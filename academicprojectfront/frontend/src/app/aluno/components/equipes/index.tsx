"use client"
import styles from './styles.module.scss'
import { RefreshCcw } from 'lucide-react'
import { EquipeProps } from '@/lib/equipe.types'
import { ModalEquipe } from '../modal'
import { use } from 'react'
import { EquipeContext } from '@/providers/equipek'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
interface Props {
    equipesx: EquipeProps[]
}
export function Equipes({ equipesx }: Props) {
    const { isOpen, onRequestOpen } = use(EquipeContext)
    const router = useRouter();
    async function handleDetalheEquipe(equipe_id: number) {
        await onRequestOpen(equipe_id)
    }

    function handleRefresh() {
        router.refresh();
        toast.success("Atualização OK")
    }
    return (
        <>
            <main className={styles.container}>
                <section className={styles.containerHeader}>
                    <h1>Filie-se a uma Equipe</h1>
                    <button onClick={handleRefresh}>
                        <RefreshCcw size={24} color='#3fffa3' />
                    </button>
                </section>
                <section className={styles.listEquipes}>
                    {equipesx.length === 0 &&
                        <span className={styles.emptyEquipe}>
                            nenhuma Equipe foi cadastrada para esta turma...
                        </span>
                    }
                    {equipesx.map(equipe => (

                        <button key={equipe.equipeID}
                            className={styles.equipeItem}
                            onClick={() => handleDetalheEquipe(equipe.equipeID)}
                        >
                            <div className={styles.tag}></div>
                            <span>{equipe.temaProjeto}</span>
                        </button>
                    ))}

                </section>
            </main>
            {isOpen && <ModalEquipe />}
        </>
    )
}