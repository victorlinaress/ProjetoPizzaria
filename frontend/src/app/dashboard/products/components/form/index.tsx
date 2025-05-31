"use client";

import { ChangeEvent, useState } from "react";
import styles from "./styles.module.scss";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/dashboard/components/button";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieCliente";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export const dynamic = "force-dynamic";

interface CategoryProps {
  id: string;
  name: string;
}

interface Props {
  categories: CategoryProps[];
}

export function Form({ categories }: Props) {
  const router = useRouter();
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");

  async function handleRegisterProduct(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault()
    const formData = new FormData(event.currentTarget);

    const categoryId = formData.get("category");
    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description");

    if (!name || !categoryId || !price || !description || !image) {
      toast.warning("Preencha todos os campos");
      return;
    }

    try {
      const data = new FormData();

      data.append("name", name as string);
      data.append("price", price as string);
      data.append("description", description);
      data.append("category_id", categoryId as string);
      data.append("file", image);

      const token = getCookieClient();

      await api.post("/product", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Produto registrado com sucesso!");
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
      toast.warning("Falha ao cadastrar esse produto!");
    }
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type !== "image/jpg" && image.type !== "image/png") {
        toast.warning("FORMATO PROIBIDO");
        return;
      }

      setImage(image);
      setPreviewImage(URL.createObjectURL(image));
      console.log(image);
    }
  }

  return (
    <main className={styles.container}>
      <h1>Novo produto</h1>

      <form className={styles.form} onSubmit={handleRegisterProduct}>
        <label className={styles.labelImage}>
          <UploadCloud size={24} color="#FFF" />
          <input
            type="file"
            accept="image/png, image/jpg"
            required
            onChange={handleFile}
          />

          {previewImage && (
            <div className={styles.previewWrapper}>
              <Image
                alt="Imagem de Preview"
                src={previewImage}
                className={styles.preview}
                fill
                priority
                quality={100}
              />
            </div>
          )}
        </label>

        <select name="category" required className={styles.input}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="name"
          placeholder="Digite o nome do produto"
          required
          className={styles.input}
        />

        <input
          type="number"
          name="price"
          placeholder="Digite o preço do produto"
          required
          className={styles.input}
        />

        <textarea
          name="description"
          placeholder="Digite a descrição do produto"
          required
          className={styles.input}
        />

        <Button name="Cadastrar produto" />
      </form>
    </main>
  );
}
