import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Crea tu cuenta"
      subtitle="Empieza a usar Flowmatic en segundos"
      footer={{
        label: "¿Ya tienes cuenta?",
        linkText: "Inicia sesión",
        linkHref: "/login",
      }}
    >
      <RegisterForm />
    </AuthLayout>
  );
}
