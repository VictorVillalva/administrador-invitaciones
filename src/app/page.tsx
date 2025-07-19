'use client'
// app/login/page.tsx (con useEffect)
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/login-form"

export default function Login() {
  const router = useRouter();
  useEffect(() => {
    if (Cookies.get("token")) {
      router.replace("/dashboard");
    }
  }, []);
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
