"use client"
import Link from 'next/link';
import styles from '../page.module.scss'
import logoImg from './public/logo1.svg'
import Image from 'next/image'
export default function signup() {
  
  return (
    
    <>

      <div className={styles.containerCenter} >
      <Image
                              alt="Logo"
                              src="/logo1.svg" // Caminho absoluto
                              width={65} // Largura
                              height={65} // Altura
                          />
     
      <section className={styles.login}>
        <h1>Criando sua Conta</h1>
        <form>
          <input
            type="email"
            required
            name="email"
            placeholder='Digite seu emailx...'
            className={styles.input}
          />
          <input
            type="password"
            required
            name="password"
            placeholder='************'
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Acessar
          </button>
        </form>
        <Link href="/" className={styles.text}>
        Já possui uma conta? Faça o Login
        </Link>
      </section>
      </div>
    </>
  )
}