import { Header } from "./components/header"
import { EquipeProvider } from "@/providers/equipek"
export default function AppLayout({ children }:
    { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <EquipeProvider>
                {children}
            </EquipeProvider>
        </>
    )
}
