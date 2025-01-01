import { getCookie } from "cookies-next";

export function getCookieClient(){
    const token = getCookie("session_aluno")
    return token;
}

