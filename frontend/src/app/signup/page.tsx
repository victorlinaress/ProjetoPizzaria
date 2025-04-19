import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.scss";
import { api } from "@/services/api";
import { redirect } from "next/navigation";

export default function Signup() {
  async function handleRegister(formData: FormData) {
    "user server";

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (name === "" || email === "" || password === "") {
      console.log("Preencha todos os campos");
      return;
    }

    try {
      await api.post("/users", {
        name,
        email,
        password,
      });
    } catch (err) {
      console.log("error");
      console.log(err);
    }
    redirect("/");
  }

  return (
    <main className={styles.containerCenter}>
      <div className={styles.logoWrapper}>
        <Image src="/logo.png" alt="Logo" width={150} height={150} />
      </div>

      <section className={styles.login}>
        <h1 className={styles.title}>Criando a sua conta</h1>

        <form className={styles.form}>
          <input
            type="email"
            required
            name="email"
            placeholder="Digite seu email"
            className={styles.input}
          />

          <input
            type="name"
            required
            name="name"
            placeholder="Digite o seu nome"
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
            Cadastrar
          </button>
        </form>

        <Link href="/" className={styles.text}>
          Já possui uma conta? Faça o login
        </Link>
      </section>
    </main>
  );
}
