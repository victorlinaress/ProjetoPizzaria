"use client";

import { createContext, ReactNode, useState } from "react";

// tipagem do contexto
type OrderContextData = {
  isOpen: boolean;
  onRequestOpen: () => void;
  onRequestClose: () => void;
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

  function onRequestOpen() {
    setIsOpen(true);
  }

  function onRequestClose() {
    setIsOpen(false);
  }

  return (
    <OrderContext.Provider value={{ isOpen, onRequestOpen, onRequestClose }}>
      {children}
    </OrderContext.Provider>
  );
}
