"use client";

import { X } from "lucide-react";
import styles from "./styles.module.scss";
import { useContext } from "react";
import { OrderContext } from "@/provider/order";

export function Modalorder() {
  const { onRequestClose } = useContext(OrderContext);

  return (
    <dialog className={styles.dialogContainer}>
      <section className={styles.dialogContent}>
        <button
          className={styles.dialogBack}
          onClick={onRequestClose}
        >
          <X size={24} color="#FFF" />
        </button>

        <article className={styles.container}>
          <h2>Detalhes do pedido</h2>

          <span className={styles.table}>
            Mesa 36 - {order[0].order.table}
          </span>

          <section className={styles.item}>
            <span>Coca Cola lata</span>
            <span>Pizza de frango com catupiry, borda recheada</span>
          </section>

          <button className={styles.buttonOrder}>
            Concluir pedido
          </button>
        </article>
      </section>
    </dialog>
  );
}
