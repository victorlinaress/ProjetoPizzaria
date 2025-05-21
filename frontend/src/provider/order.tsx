"use client";

import { createContext, ReactNode, useState } from "react";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieCliente";

// tipagem do contexto
type OrderContextData = {
  isOpen: boolean;
  onRequestOpen: (order_id: string) => void;
  onRequestClose: (order_id: string) => void;
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
const [order, setOrder] = useState<OrdemItemProps[]>([]);

  function onRequestOpen(order_id: string) {
    console.log(order_id);//
const token = getCookieClient();

const response = await api.get("/order/detail", {
  headers: {
    Authorization: `Bearer ${token}`
  },
  params: {
    order_id: order_id
  }
});

setIsOpen(true);


  function onRequestClose() {
    setIsOpen(false);
  }

  return (
    <OrderContext.Provider value={{ isOpen, onRequestOpen, onRequestClose }}>
      {children}
    </OrderContext.Provider>
  );
}
