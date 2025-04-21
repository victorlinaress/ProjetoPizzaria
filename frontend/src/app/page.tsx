import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.scss";
import { api } from "@/services/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Page() {
  async function handleLogin(formData: FormData) {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");

    if (email === "" || password === "") {
      return;
    }

    try {
      const response = await api.post("session", {
        email,
        password,
      });

      if (!response.data.token) {
        return;
      }

      const expireTime = 60 * 60 * 24 * 30; // define o texto de expiração segundos
      const cookieStore = await cookies(); // espera a função cookies

      cookieStore.set("session", response.data.token, { //passando o token para o cookie
        maxAge: expireTime, //duração do cookie
        path: "/", //acessivel em toda aplicação
        httpOnly: false, //acessivel no cliente-side
        secure: false //em produção ele fica true
      });

      console.log(response.data);
    } catch (err) {
      console.log(err);
      return;
    }

    redirect("/dashboard");
  }

  return (
    <main className={styles.containerCenter}>
      <div className={styles.logoWrapper}>
        <Image src="/logo.png" alt="Logo" width={150} height={150} />
      </div>

      <section className={styles.login}>
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

        <Link href="/signup" className={styles.text}>
          Não possui uma conta? Cadastre
        </Link>
      </section>
    </main>
  );
}
