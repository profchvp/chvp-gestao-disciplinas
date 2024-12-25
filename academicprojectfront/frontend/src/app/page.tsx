"use client"
import { useState } from 'react';
import styles from './page.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '@/services/api';
import { toast } from 'sonner';
//import { redirect } from 'next/navigation';
import Cookies from 'js-cookie'; // Importação da biblioteca js-cookie

import { useRouter } from 'next/router'; // Importação para redirecionamento client-side

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);


  async function handleLogin(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    setIsLoading(true);

    try {
      const response = await api.post("/session", {
        emailUsuario: email,
        senhaUsuario: password
      });

      console.log('Resposta da API:', response);

      // Verifique se a resposta está no formato esperado
      if (response && response.data) {
        const { retorno, message, data } = response.data;

        if (retorno === 100) {
          //console.log('Dados do usuário:', data);
          //console.log('Redirecionando para /home');
          const expressTime = 60 * 60 * 24 * 30 * 1000;
           // Salva o token no cookie usando js-cookie
           Cookies.set("session", data.token, {
            expires: expressTime, // Define a expiração em dias
            path: "/",
            secure: process.env.NODE_ENV === "production", // Somente HTTPS em produção
          });

          console.log('Token armazenado no cookie:', data.token);
          console.log('Redirecionando para /home');
          window.location.href = "/home"; // Redirecionamento usando window.location
          return; // Certifique-se de sair da função após o redirecionamento

        } else {
          toast.error(message);
          setIsLoading(false);
          return
        }
      } else {
        toast.error("Resposta da API em formato inesperado");
        setIsLoading(false);
        return
      }

    } catch (err) {
      console.error('Erro no login:', err);
      toast.error("Erro no login");
    } finally {
      setIsLoading(false);
    }

  }
  return (
    <>
      <div className={styles.containerCenter}>
        LOGO

        <section className={styles.login}>
          <form onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            handleLogin(new FormData(form));
          }}>
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
            <button type="submit" className={styles.button} disabled={isLoading}>
              {isLoading ? 'Carregando...' : 'Acessar'}
            </button>
          </form>
          <Link href="/signup" className={styles.text}>
            Não possui uma conta? Cadastre-se
          </Link>
        </section>
      </div>
    </>
  );
}