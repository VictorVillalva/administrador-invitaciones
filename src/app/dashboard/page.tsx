'use client'
import { AppSidebar } from "@/components/app-sidebar";
import CardFestejada from "@/components/card-festejada";
import { DataTableInvitaciones, Invitado } from "@/components/DataTableInvitaciones";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import api from "@/lib/api";
import { useEffect, useState } from "react";


export default function Page() {
  const [data, setData] = useState<Invitado[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      const userDataStr = localStorage.getItem("userData");
      let uuid = "";
      if (userDataStr) {
        const userData = JSON.parse(userDataStr);
        uuid = userData.uuid;
      }
      if (!uuid) {
        setLoading(false);
        return; // No hay uuid, puedes mostrar un error o redirigir
      }
      try {
        const res = await api.get(`/api/guests/invitation/${uuid}`);
        const guestList = res.data.data.guestList; // <- Aquí están todos los invitados
        setData(guestList); // ¡Esto es lo que pasas como prop!
      } catch (error) {
        setData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="h-screen flex flex-1 flex-col items-center justify-center text-center text-neutral-400 text-2xl font-medium">Cargando...</div>;


  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col m-8 gap-10">
            <div className="flex flex-col gap-1">
              <p className="text-3xl font-bold text-neutral-700">Lista de invitados</p>
              <small>Revisa los invitadas que ya han confirmado su asistencias a tu evento especial.</small>
            </div>
            <div className="flex flex-row gap-8">
              <div className="w-full p-4 bg-white rounded-lg border border-neutral-200 shadow-md">
                <DataTableInvitaciones data={data}/>
              </div>
              <div className="w-full max-w-[400px] h-full">
                <CardFestejada />
              </div>
            </div>
          </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
