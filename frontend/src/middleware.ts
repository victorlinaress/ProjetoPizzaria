import { NextRequest, NextResponse } from "next/server";
import { getCookieServer } from "./lib/cookieServer";
import { api } from "./services/api";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // libera acesso a rotas internas do Next e à raiz "/"
  if (pathname.startsWith("/_next") || pathname === "/") {
    return NextResponse.next();
  }

  const token = await getCookieServer();

  // protege rotas que começam com "/dashboard"
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const isValid = await validadeToken(token);
    if (!isValid) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

// função auxiliar fora do middleware
async function validadeToken(token: string): Promise<boolean> {
  if (!token) return false;

  try {
    await api.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return true;
  } catch (err) {
    console.log("Token inválido:", err);
    return false;
  }
}
