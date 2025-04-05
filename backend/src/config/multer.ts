// Importa o módulo crypto para gerar hash aleatório
import crypto from "crypto";

// Importa o multer, que é o middleware para upload de arquivos
import multer from "multer";

// Importa funções para lidar com caminhos de arquivos
import { extname, resolve } from "path";

// Exporta uma função default chamada upload, que recebe o nome de uma pasta
export default {
  upload(folder: string) {
    return {
      // Define a configuração de armazenamento para o multer
      storage: multer.diskStorage({
        // Define o diretório onde os arquivos serão salvos
        destination: resolve(__dirname, '..', '..', folder),

        // Define como o nome do arquivo será salvo no servidor
        filename: (request, file, callback) => {
          // Gera uma string aleatória com 16 bytes, convertida em hexadecimal
          const fileHash = crypto.randomBytes(16).toString("hex");

          // Cria o nome final do arquivo juntando o hash com o nome original
          const fileName = `${fileHash}-${file.originalname}`;

          // Finaliza o processo de definição do nome, passando o nome gerado
          return callback(null, fileName);
        }
      }),
    };
  },
};
