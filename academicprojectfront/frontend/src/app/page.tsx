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

  async function checkUserRole(papel_ID: number,token:string) {
    try {

      const papelResponse = await api.post("/papelusuario", {
         papelID: papel_ID });


      if (papelResponse && papelResponse.data) {
        const { error, data: papelData, message: papelMessage } = papelResponse.data;

        if (!error) {
          if (papelData.nivelPapel === 2) {
            const expressTime = 60 * 60 * 24 * 30 * 1000;
            // Salva o token no cookie usando js-cookie
            Cookies.set("session_aluno", token, {
              expires: expressTime, // Define a expiração em dias
              path: "/",
              secure: process.env.NODE_ENV === "production", // Somente HTTPS em produção
            });
            // console.log('Token armazenado no cookie:', data.token);
            window.location.href = "/aluno";
          } else {
            const expressTime = 60 * 60 * 24 * 30 * 1000;
            // Salva o token no cookie usando js-cookie
            Cookies.set("session_admin", token, {
              expires: expressTime, // Define a expiração em dias
              path: "/",
              secure: process.env.NODE_ENV === "production", // Somente HTTPS em produção
            });
            // console.log('Token armazenado no cookie:', data.token);
            window.location.href = "/admin";
          }
        } else {
          toast.error(papelMessage);
        }
      } else {
        toast.error("Resposta da API de papel em formato inesperado");
      }
    } catch (err) {
      console.error('Erro ao verificar papel do usuário:', err);
      toast.error("Erro ao verificar papel do usuário");
    }
  }
  async function handleLogin(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    setIsLoading(true);

    try {
      const response = await api.post("/session", {
        emailUsuario: email,
        senhaUsuario: password
      });

      //console.log('Resposta da API:', response);

      // Verifique se a resposta está no formato esperado
      if (response && response.data) {
        const { retorno, message, data } = response.data;

        if (retorno === 100) {
          //console.log('Dados do usuário:', data);
          //console.log('Redirecionando para /aluno');
                   //console.log('Redirecionando para /aluno');

          //window.location.href = "/aluno"; // Redirecionamento usando window.location
          //return; // Certifique-se de sair da função após o redirecionamento
          // Chama a função para verificar o papel do usuário
          await checkUserRole(data.papel, data.token);
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
        <Image
          alt="Logo"
          src="/logo1.svg" // Caminho absoluto
          width={100} // Largura
          height={100} // Altura
        />

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