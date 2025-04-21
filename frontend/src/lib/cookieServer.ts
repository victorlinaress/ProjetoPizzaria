import { cookies } from "next/headers";

export async function getCookieServer() {
  const cookieStore = await cookies(); // recupera o store de cookies no contexto do servidor
  const token = cookieStore.get("session")?.value; //  pegar o valor do cookie "session"

  return token || null; 
}
