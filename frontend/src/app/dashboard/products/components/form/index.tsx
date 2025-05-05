"use client";

import { ChangeEvent, useState } from "react";
import styles from "./styles.module.scss";
import { UploadCloud } from "lucide-react";
import Image from "next/image";

export function Form() {
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type !== "image/jpg" && image.type !== "image/png") {
        console.log("FORMATO PROIBIDO");
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

      <form className={styles.form}>
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
          <option value="">Selecione uma categoria</option>
          <option value="1">Pizzas</option>
          <option value="2">Massas</option>
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
      </form>
    </main>
  );
}
