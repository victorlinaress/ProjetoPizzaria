"use client";

import { createContext, ReactNode, useState } from "react";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieCliente";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

// Tipagem do contexto
type OrderContextData = {
  isOpen: boolean;
  onRequestOpen: (order_id: string) => Promise<void>;
  onRequestClose: () => void;
  order: OrderItemProps[];
  finishOrder: (order_id: string) => Promise<void>;
};

// Tipagem do provider
type OrderProviderProps = {
  children: ReactNode;
};

// Criação do contexto
export const OrderContext = createContext({} as OrderContextData);

// Provider que envolve os componentes que usarão o contexto
export function OrderProvider({ children }: OrderProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState<OrderItemProps[]>([]);
  const router = useRouter();

  // Função para abrir o modal e buscar os detalhes do pedido
  async function onRequestOpen(order_id: string) {
    const token = getCookieClient();

    try {
      const response = await api.get("/order/detail", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          order_id: order_id,
        },
      });

      setOrder(response.data);
      setIsOpen(true);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao buscar detalhes do pedido.");
    }
  }

  // Função para fechar o modal
  function onRequestClose() {
    setIsOpen(false);
  }

  // Função para finalizar o pedido
  async function finishOrder(order_id: string) {
    const token = getCookieClient();

    try {
      await api.put(
        "/order/finish",
        { order_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Pedido finalizado com sucesso");
      setIsOpen(false);
      router.reload();
    } catch (err) {
      console.error(err);
      toast.error("Falha ao finalizar esse pedido");
    }
  }

  return (
    <OrderContext.Provider
      value={{
        isOpen,
        onRequestOpen,
        onRequestClose,
        order,
        finishOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
