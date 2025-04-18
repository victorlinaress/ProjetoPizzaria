import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.scss";

export default function Page() {
  return (
    <main className={styles.containerCenter}>
      <div className={styles.logoWrapper}>
        <Image src="/logo.png" alt="Logo" width={150} height={150} />
      </div>

      <section className={styles.login}>
        <form className={styles.form}>
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

        <Link href="/signup#" className={styles.text}>
          Não possui uma conta? Cadastre
        </Link>
      </section>
    </main>
  );
}
