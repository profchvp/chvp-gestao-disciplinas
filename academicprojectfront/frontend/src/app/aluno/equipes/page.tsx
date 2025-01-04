//"use client";
import { api } from "@/services/api"
import { getCookiesServer } from "@/lib/cookieServer";
import { Equipes } from '../components/equipes';  // Ajuste o caminho conforme necessário
import { EquipeProps } from '@/lib/equipe.types';

async function getEquipes():Promise<EquipeProps|[]> {
  try {
      const token = await getCookiesServer();
      const response = await api.get("/equipes", {
          headers: {
              Authorization: `Baerer${token}`
          }
      })
      return response.data || []
  } catch (err) {
      console.log(err);
      return [];
  }
}

export default async function EquipesPage() {
  const equipes = await getEquipes();
  return <Equipes equipesx={equipes} />;
}
