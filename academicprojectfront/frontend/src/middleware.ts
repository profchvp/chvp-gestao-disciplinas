
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { api } from "./services/api";
export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    //console.log("passou Middleware")
    // Permitir acesso a assets ou à página inicial
    if (pathname.startsWith("/_next") || pathname === "/") {
        return NextResponse.next();
    }



    // Verifica se o token existe para ADMIN
    if (pathname.startsWith("/admin")) {
        // Captura o cookie diretamente do NextRequest
        const token_admin = req.cookies.get("session_admin")?.value;
        if (!token_admin) {
            console.log("Token não encontrado para ADMIN, redirecionando para login.");
            return NextResponse.redirect(new URL("/", req.url));
        }
        const isValid = await validarToken(token_admin);
        if (!isValid) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }
    // Captura o cookie diretamente do NextRequest

    // Verifica se o token existe para aluno
    if (pathname.startsWith("/aluno")) {
        const token_aluno = req.cookies.get("session_aluno")?.value;
        if (!token_aluno) {
            console.log("Token não encontrado para ALUNO, redirecionando para login.");
            return NextResponse.redirect(new URL("/", req.url));
        }
        const isValid = await validarToken(token_aluno);
        if (!isValid) {
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