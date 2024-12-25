
import Link from 'next/link';
import styles from '../page.module.scss'
export default function signup() {
  return (
    <>

      <div className={styles.containerCenter} >
        LOGO
     
      <section className={styles.login}>
        <h1>Criando sua Conta</h1>
        <form>
          <input
            type="email"
            required
            name="email"
            placeholder='Digite seu email...'
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