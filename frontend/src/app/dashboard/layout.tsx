import React from "react";
import { Header } from "./components/header";
import { OrderProvider } from "@/provider/order";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <OrderProvider>{children}</OrderProvider>
    </>
  );
}
