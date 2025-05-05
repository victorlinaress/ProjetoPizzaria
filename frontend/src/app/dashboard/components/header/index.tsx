import Image from "next/image";
import Link from "next/link";
import { LogOutIcon } from "lucide-react";
import styles from './styles.module.scss'
import logoImg from "../../../public/logo.png";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <Image
            alt="Logo Sujeito Pizza"
            src="/logo.png"
            width={190}
            height={60}
            className={styles.logo}
            priority
          />
        </Link>

        <nav>
          <Link href={"/dashboard/category"}>Categoria</Link>
          <Link href={"/dashboard/product"}>Produto</Link>

          <form>
            <button type="submit" ></button>
            <LogOutIcon size={24} color="#FFF"></LogOutIcon>
          </form>
        </nav>
      </div>
    </header>
  );
}
