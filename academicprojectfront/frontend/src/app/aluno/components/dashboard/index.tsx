"use client"
import { api } from "@/services/api"
import { getCookiesServer } from "@/lib/cookieServer";
import { EquipeProps } from "@/lib/equipe.types";
import styles from './styles.module.scss'
import { redirect } from 'next/navigation';
import { Equipes } from '../equipes';
export async function Dashboard() {
  
  async function handleFiliar() {
    // Redireciona para a página de equipes
    redirect('/aluno/equipes');
  }
  return (
    <>
      <main className={styles.container}>

        <header className={styles.containerHeader}>
          <h1>Bem-vindo, [Nome do Aluno]</h1>
        </header>


        <section className={styles.deliveries}>
          <h2>Programação de Entregas</h2>
          <form >
            <ul className={styles.deliveries__list}>
              <li className={styles.delivery}>
                <span className={styles.delivery__title}>Projeto 1</span>
                <span className={styles.delivery__date}>10/01/2025</span>
              </li>
              <li className={styles.delivery}>
                <span className={styles.deliverytitle}>Atividade 2</span>
                <span className={styles.deliverydate}>03/01/2025</span>
              </li>
              <li className={styles.delivery}>
                <span className={styles.deliverytitle}>Relatório Final</span>
                <span className={styles.deliverydate}>28/12/2024</span>
              </li>
            </ul>
          </form>
        </section>

        <section className={styles.status}>
          <h2>Posicionamento da Equipe</h2>
          <div className={styles.status}>
            <div className={styles.status}>5 OK</div>
            <div className={styles.status}>2 A Vencer</div>
            <div className={styles.status}>1 Em Atraso</div>
          </div>
        </section>
        <form action={handleFiliar}>
          <button type="submit" >
            Filiar-se à Equipe
          </button>
        </form>

      </main>

    </>
  )
}