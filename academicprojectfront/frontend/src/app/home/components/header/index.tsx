"use client"
import Link from 'next/link'
import styles from './styles.module.scss'
import Image from 'next/image'
import { LogOutIcon } from 'lucide-react'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

export function Header() {
    const router = useRouter();
    async function handleLogout() {
        deleteCookie("session", { path: "/" })
        router.replace("/");
    }
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/home">
                    <Image
                        alt="Logo"
                        src="/Rendezvous2.svg" // Caminho absoluto
                        width={100} // Largura
                        height={100} // Altura
                    />
                </Link>
                <nav>
                    <Link href="/home/Equipes">
                        Equipes
                    </Link>
                    <Link href="/home/produto">
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