'use client'
import { Citrus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type LoginData = z.infer<typeof loginSchema>

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {

  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginData) => {
    console.log(data)
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <Citrus  className="size-6" />
              </div>
              <span className="sr-only">Loop Tech</span>
            </a>
            <h1 className="text-xl font-bold">Bienvenido a Invitaciones Virtuales</h1>
            <div className="text-center text-sm">
              Ingresa la credenciales de tu cuenta para continuar.
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Correo electronico</Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@example.com"
                {...register("email")}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                {...register("password")}
                required
              />
            </div>
            {errors.password && <span>{errors.password.message}</span>}
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </div>
        </div>
      </form>
      <div className="text-muted-foreground text-center text-xs text-balance">
        Todos los derechos reservados &copy; 2025 Rabe Innovation
      </div>
    </div>
  )
}
