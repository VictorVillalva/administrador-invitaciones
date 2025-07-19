'use client'
import { Citrus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';


const loginSchema = z.object({
  username: z.string().email(),
  password: z.string().min(4),
})

type LoginData = z.infer<typeof loginSchema>

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginData) => {
    try {
      const { data } = await axios.post("http://localhost:8080/invitation/sign-in", {
        credentials: {
          username: values.username,
          password: values.password,
        }
      });

      // Supón que el token viene en data.token
      Cookies.set('token', data.token, { expires: 7 }); // 7 días

      router.push('/dashboard');
    } catch (error: any) {
      setError('root', {
        type: 'manual',
        message: 'Credenciales inválidos. Por favor, inténtalo de nuevo.',
      });
    }
  };
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
                {...register("username")}
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
            {errors.root && (
              <div className="text-red-600">{errors.root.message}</div>
            )}
            <Button type="submit" className="w-full">
              {isSubmitting ? 'Ingresando...' : 'Ingresar'}
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
