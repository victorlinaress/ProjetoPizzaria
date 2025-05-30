"use client";

import Image from "next/image";
import Link from "next/link";
import { LogOutIcon } from "lucide-react";
import styles from "./styles.module.scss";
import logoImg from "../../../public/logo.png";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { deleteCookie } from "cookies-next";

export function Header() {
  const router = useRouter();

  async function handleLogout() {
    deleteCookie("session", { path: "/" });
    toast.success("Logout feito com sucesso");
    router.replace("/");
  }
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <Image
            alt="Logo Sujeito Pizza"
            src="/logo.png"
            width={200}
            height={60}
            className={styles.logo}
            priority
          />
        </Link>

        <nav>
          <Link href={"/dashboard/category"}>Categoria</Link>
          <Link href={"/dashboard/products"}>Produto</Link>

          <form>
            <button type="submit"></button>
            <LogOutIcon size={24} color="#FFF"></LogOutIcon>
          </form>
        </nav>
      </div>
    </header>
  );
}
