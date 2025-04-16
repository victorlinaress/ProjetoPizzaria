import styles from './page.module.scss';
import Link from 'next/link';
import Image from 'next/image'

export default function Page() {
  return (
    <main>
      <h1 className={styles.containerCenter}>
        <Image src="/logo.png" alt="Logo" width={120} height={120} />
      </h1>

      <section className={styles.login}>
        <form>
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

          <button type='submit'>Acessar</button>
        </form>

        <Link href="" className={styles.text}>
          Não possui uma conta? Cadastre
        </Link>
      </section>
    </main>
  );
}
