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
        <label className={styles.labelimage}>
          <UploadCloud size={24} color="#FFF" />
          <input
            type="file"
            accept="image/png, image/jpg"
            required
            onChange={handleFile}
            style={{ display: "none" }}
          />

          {previewImage && (
            <div className={styles.previewWrapper}>
              <Image
                alt="Imagem de Preview"
                src={previewImage}
                className={styles.preview}
                width={300}
                height={300}
                quality={100}
              />
            </div>
          )}
        </label>
      </form>
    </main>
  );
}
