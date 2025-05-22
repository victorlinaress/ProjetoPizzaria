"use client";

import { createContext, ReactNode, useState } from "react";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieCliente";

// tipagem do contexto
type OrderContextData = {
  isOpen: boolean;
  onRequestOpen: (order_id: string) => Promise<void>;
  onRequestClose: () => void;
  order: OrderItemProps[];
};

// tipagem do provider
type OrderProviderProps = {
  children: ReactNode;
};

// criação do contexto
export const OrderContext = createContext({} as OrderContextData);

// provider que envolve os componentes que usarão o contexto
export function OrderProvider({ children }: OrderProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState<OrderItemProps[]>([]);

  async function onRequestOpen(order_id: string) {
    console.log(order_id);

    const token = getCookieClient();

    const response = await api.get("/order/detail", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        order_id: order_id,
      },
    });

    setOrder(response.data); // Talvez você queira setar os dados aqui?
    setIsOpen(true);
  }

  function onRequestClose() {
    setIsOpen(false);
  }

  return (
    <OrderContext.Provider
      value={{ isOpen, onRequestOpen, onRequestClose, order }}
    >
      {children}
    </OrderContext.Provider>
  );
}
