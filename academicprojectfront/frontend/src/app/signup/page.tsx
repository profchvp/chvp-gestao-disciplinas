"use client"
import { useState } from 'react';
import Link from 'next/link';
import styles from '../page.module.scss';
import Image from 'next/image';
import { toast } from 'sonner';
import { api } from '@/services/api';
export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);

  function validateEmail(email) {
    // Regex para validar o domínio específico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@fatec\.sp\.gov\.br$/;
    return emailRegex.test(email);
  }
  function validatePassword(password) {
    // Regex para senha forte
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    return passwordRegex.test(password);
  }
  async function existeUsuarioCadastro(emailUsuario: string): Promise<boolean> {
    try {
      // Chamada ao endpoint correto com parâmetros
      const response = await api.get("/getusuario", {
        params: { emailUsuario },
      });

      // Verifica se a resposta contém dados válidos
      const resposta = response.data;
      if (resposta && resposta.emailUsuario) {
        return true; // Usuário existe
      }

      return false; // Usuário não encontrado
    } catch (error) {
      console.error("Erro ao verificar usuário existente:", error);
      return false; // Retorna false em caso de erro
    }
  }
  async function handleSignup(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!validateEmail(email)) {
      toast.error("Por favor, insira um email válido com o domínio @fatec.sp.gov.br");
      return;
    }
    if (!validatePassword(password)) {
      toast.error("A senha deve conter pelo menos uma letra maiúscula, um caractere especial e ter no mínimo 8 caracteres.");
      return;
    }

    setIsLoading(true);
    const usuarioExistente = await existeUsuarioCadastro(email);
    if (usuarioExistente) {
      {
        toast.error("Ja existe Conta cadastrada para este email.");
        setIsLoading(false);
        return;
      }
      // Aqui você pode adicionar o código para enviar os dados para o backend
      try {
        const response = await api.post("/user", {
          emailUsuario: email,
          senhaUsuario: password,
          papelID: 2
        });

        if (!response) {
          throw new Error("Erro ao cadastrar. Por favor, tente novamente.");
        }

        alert("Cadastro bem-sucedido!");
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
      // ...

      setIsLoading(false);
    }

    return (
      <>
        <div className={styles.containerCenter}>
          <Image
            alt="Logo"
            src="/logo1.svg" // Caminho absoluto
            width={65} // Largura
            height={65} // Altura
          />

          <section className={styles.login}>
            <h1>Criando sua Conta</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                handleSignup(new FormData(form));
              }}
            >
              <input
                type="email"
                required
                name="email"
                placeholder="Digite seu email..."
                className={styles.input}
              />
              <input
                type="password"
                required
                name="password"
                placeholder="************"
                className={styles.input}
              />
              <button type="submit" className={styles.button} disabled={isLoading}>
                {isLoading ? 'Carregando...' : 'Cadastrar'}
              </button>
            </form>
            <Link href="/" className={styles.text}>
              Já possui uma conta? Faça o Login
            </Link>
          </section>
        </div>
      </>
    );
  }