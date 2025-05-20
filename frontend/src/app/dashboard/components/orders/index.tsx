"use client";

import styles from "./styles.module.scss";
import { RefreshCcw } from "lucide-react";
import { OrderProps } from "@/lib/order.type";
import { Modalorder } from "../modal";
import use from "react";
import { OrderContext } from "@/provider/order";

interface Props {
  orders: OrderProps[];
}

export function Orders({ orders }: Props) {
  const { isOpen, onRequestOpen } = use(OrderContext);
  return (
    <>
      <main className={styles.container}>
        <section className={styles.containerHeader}>
          <h1>Últimos Pedidos</h1>
          <button>
            <RefreshCcw size={24} color="#3fffa3" />
          </button>
        </section>

        <section className={styles.listOrders}>
          {orders.map((order) => (
            <button key={order.id} className={styles.orderItem}>
              <div className={styles.tag}>
                <span>Mesa {order.table}</span>
              </div>
            </button>
          ))}
        </section>
      </main> 
      {isOpen && <Modalorder/>}  //se for true, ele renderiza, se tiver false, não renderiza

    </>
  );
}
