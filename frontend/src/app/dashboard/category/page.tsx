import styles from "./styles.module.scss";
import { Button } from "../components/button";
import { api } from "@/services/api";
import { redirect } from "next/navigation";
import { getCookieServer } from "@/lib/cookieServer";

export default function Category() {
  async function handleRegisterCategory(formData: FormData) {
    "use server";

    const name = formData.get("name");
    if (!name || name === "") return;

    const data = {
      name: name,
    };

    const token = getCookieServer();

    try {
      const response = await api.post('/category', data, { //faz a requisição para o backend
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Depois que cadastrar, pode redirecionar, por exemplo:
      redirect('/dashboard'); 
      
    } catch (err) {
      console.log(err);
      return;
    }
  }

  return (
    <main className={styles.container}>
      <h1>Página de categoria</h1>

      <form className={styles.form} action={handleRegisterCategory}>
        <input
          type="text"
          name="name"
          placeholder="Nome da categoria, ex: Pizzas, Refrigerante"
          required
          className={styles.input}
        />

        <Button name="Cadastrar" />
      </form>
    </main>
  );
}
