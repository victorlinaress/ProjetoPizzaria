import { X } from "lucide-react";
import styles from "./styles.module.scss"; // supondo que o CSS esteja aqui

export function Modalorder() {
  return (
    <dialog className={styles.dialogContainer}>
      <section className={styles.dialogContent}>
        <button className={styles.dialogBack}>
          <X size={24} color="#FFF" />
        </button>

        <article className={styles.container}>
          <h2>Detalhes do pedido</h2>
          <span className={styles.table}>Mesa 36</span>

          <section className={styles.item}>
            <span>Coca Cola lata</span>
            <span>Pizza de frango com catupiry, borda recheada</span>
          </section>

          <button className={styles.buttonOrder}>Concluir pedido</button>
        </article>
      </section>
    </dialog>
  );
}
