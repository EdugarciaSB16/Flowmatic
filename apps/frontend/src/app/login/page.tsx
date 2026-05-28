import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Bienvenido de nuevo"
      subtitle="Inicia sesión para continuar a Flowmatic"
      footer={{
        label: "¿No tienes cuenta?",
        linkText: "Regístrate",
        linkHref: "/register",
      }}
    >
      <LoginForm />
    </AuthLayout>
  );
}
