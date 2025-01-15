"use server"
import { cookies } from 'next/headers';

export async function getCookiesServer() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_aluno")?.value;
    return token || null;
}