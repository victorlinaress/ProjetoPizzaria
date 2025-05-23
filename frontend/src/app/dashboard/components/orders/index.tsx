"use client";

import styles from "./styles.module.scss";
import { RefreshCcw } from "lucide-react";
import { OrderProps } from "@/lib/order.type";
import { Modalorder } from "../modal";
import { useContext } from "react";
import { OrderContext } from "@/provider/order";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Props {
  orders: OrderProps[];
}

export function Orders({ orders }: Props) {
  const { isOpen, onRequestOpen } = useContext(OrderContext);
  const router = useRouter();

  async function handleDetailsOrder(order_id: string) {
    await onRequestOpen(order_id);
  }

  function handleRefresh() {
    router.refresh();
    toast.success("Pedidos atualizados com sucesso");
  }

  return (
    <>
      <main className={styles.container}>
        <section className={styles.containerHeader}>
          <h1>Últimos Pedidos</h1>
          <button onClick={handleRefresh}>
            <RefreshCcw size={24} color="#3fffa3" />
          </button>
        </section>

        <section className={styles.listOrders}>
          {orders.length === 0 && (
            <span className={styles.emptyItem}>
              Nenhum pedido aberto no momento
            </span>
          )}
          {orders.map((order) => (
            <button
              key={order.id}
              className={styles.orderItem}
              onClick={() => handleDetailsOrder(order.id)}
            >
              <div className={styles.tag}>
                <span>Mesa {order.table}</span>
              </div>
            </button>
          ))}
        </section>
      </main>

      {isOpen && <Modalorder />}
    </>
  );
}
