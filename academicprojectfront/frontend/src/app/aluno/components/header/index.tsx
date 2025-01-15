"use client"
import Link from 'next/link'
import styles from './styles.module.scss'
import Image from 'next/image'
import { LogOutIcon } from 'lucide-react'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { AlunoNavegacaoPropsx } from '@/lib/alunonavegacao.types'
interface Props{
    alunonavegacao:AlunoNavegacaoPropsx
}
//----------------------"AlunoNavegação" é passado no "Header" do componente "AppLayout" que está em "layout.tsx" 
export function Header({AlunoNavegacao}:Props) {
   
    const router = useRouter();
    async function handleLogout() {
        deleteCookie("session_aluno", { path: "/" })
        router.replace("/");
    }
    return (
        
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/home">
                    <Image
                        alt="Logo"
                        src="/logo1.svg" // Caminho absoluto
                        width={65} // Largura
                        height={65} // Altura
                    />
                </Link>
                <div>
                    <span className={styles.headerIdAluno}>Aluno: {AlunoNavegacao.registroAluno_ID}-</span>
                    <span className={styles.headerIdAluno}>{AlunoNavegacao.nomeAluno}</span>
                </div>
                <nav>
                    <Link href="/aluno/Equipes">
                        Equipes
                    </Link>
                    <Link href="/aluno/produto">
                        Produto
                    </Link>

                    <form action={handleLogout}>
                        <button type='submit'>
                            <LogOutIcon size={24} color="#fff" />
                        </button>
                    </form>
                </nav>
            </div>
        </header>
    )
}