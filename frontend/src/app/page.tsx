import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.scss";
import { api } from "@/services/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Page() {
  async function handleLogin(formData: FormData) {//processa o login do usuario
    "use server";

    // garantindo que os valores são convertidos para string e removendo espaços extras
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();

    // verificando se os campos estão preenchidos corretamente
    if (!email || !password) {
      console.log("Preencha todos os campos");
      return;
    }

    try {
      // requisição para o endpoint de login
      const response = await api.post("/session", {
        email,
        password,
      });

      // verifica se o token foi retornado na resposta
      if (!response.data.token) {
        console.log("Token não retornado.");
        return;
      }

      const expireTime = 60 * 60 * 24 * 30; //tempo da validade do cookie
      const cookieStore = await cookies(); 

      // armazena o token no cookie
      cookieStore.set("session", response.data.token, {
        maxAge: expireTime,
        path: "/", // acessível em toda a aplicação
        httpOnly: false, // disponível no lado do cliente
        secure: false, // em produção, você deve definir como 'true'
      });

      console.log("Token recebido:", response.data.token);
    } catch (err) {
      console.log("Erro no login:", err);
      return;
    }

    // redireciona para a página de dashboard após o login
    redirect("/dashboard");
  }

  return (
    <main className={styles.containerCenter}>
      <div className={styles.logoWrapper}>
        <Image src="/logo.png" alt="Logo" width={150} height={150} />
      </div>

      <section className={styles.login}>
        {/* formulário de login */}
        <form action={handleLogin} className={styles.form}>
          <input
            type="email"
            required
            name="email"
            placeholder="Digite seu email"
            className={styles.input}
          />

          <input
            type="password"
            required
            name="password"
            placeholder="Digite sua senha"
            className={styles.input}
          />

          <button type="submit" className={styles.button}>
            Acessar
          </button>
        </form>

        {/* link para página de cadastro */}
        <Link href="/signup" className={styles.text}>
          Não possui uma conta? Cadastre
        </Link>
      </section>
    </main>
  );
}
