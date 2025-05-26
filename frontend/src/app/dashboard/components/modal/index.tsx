"use client";

import { X } from "lucide-react";
import styles from "./styles.module.scss";
import { useContext } from "react";
import { OrderContext } from "@/provider/order";
import { calculeTotalOrder } from "@/lib/helper";

export function Modalorder() {
  const { onRequestClose, finishOrder, order } = useContext(OrderContext);

  async function handleFinishOrder() {
    await finishOrder(order[0].order.id);
  }

  return (
    <div className={styles.dialogContainer}>
      <section className={styles.dialogContent}>
        <button className={styles.dialogBack} onClick={onRequestClose}>
          <X size={24} color="#FFF" />
        </button>

        <article className={styles.container}>
          <h2>Detalhes do pedido</h2>

          <span className={styles.table}>Mesa {order[0].order.table}</span>

          {order[0]?.order?.name && (
            <span className={styles.name}>Nome {order[0].order.name}</span>
          )}

          {order.map((item) => (
            <section className={styles.item} key={item.id}>
              <span>
                Qtd: {item.amount} {item.product.name} - R$
                {(parseFloat(item.product.price) * item.amount).toFixed(2)}
              </span>
              <span className={styles.description}>
                {item.product.description}
              </span>
            </section>
          ))}

          <h3 className={styles.total}>Valor total do pedido R${calculeTotalOrder(order)}</h3>

          <button className={styles.buttonOrder} onClick={handleFinishOrder}>
            Concluir pedido
          </button>
        </article>
      </section>
    </div>
  );
}
