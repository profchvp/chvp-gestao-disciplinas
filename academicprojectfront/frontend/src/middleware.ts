
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { api } from "./services/api";
export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Permitir acesso a assets ou à página inicial
    if (pathname.startsWith("/_next") || pathname === "/") {
        return NextResponse.next();
    }

    // Captura o cookie diretamente do NextRequest
    const token = req.cookies.get("session")?.value;

    // Verifica se o token existe
    if (pathname.startsWith("/home")) {
        if (!token) {
            console.log("Token não encontrado, redirecionando para login.");
            return NextResponse.redirect(new URL("/", req.url));
        }
        const isValid = await validarToken(token);
        if (!isValid){
            return NextResponse.redirect(new URL("/", req.url));
        }
    }


    //console.log("Token encontrado:", token);

    return NextResponse.next();
}

async function validarToken(token: string) {
    if (!token) return false;
    try {
        await api.get("/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return true
    } catch (err) {
        console.log(err)
        return false;
    }
}