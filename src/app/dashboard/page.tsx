'use client'
import { AppSidebar } from "@/components/app-sidebar";
import CardFestejada from "@/components/card-festejada";
import { DataTableInvitaciones } from "@/components/DataTableInvitaciones";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { useUser } from "@/context/UserContext";


export default function Page() {
  const { user } = useUser();
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
          <div className="flex flex-col m-12 gap-10">
            <div className="flex flex-col gap-1">
              <p className="text-3xl font-bold text-neutral-700">Lista de invitados</p>
              <small>Revisa los invitadas que ya han confirmado su asistencias a tu evento especial.</small>
            </div>
            <div className="flex flex-row gap-8">
              <div className="w-full p-4 bg-white rounded-lg border border-neutral-200 shadow-md">
                <DataTableInvitaciones />
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
