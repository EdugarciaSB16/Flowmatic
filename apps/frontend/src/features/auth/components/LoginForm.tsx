"use client";

import { zodResolver } from "@/lib/zod-resolver";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/schema/auth.schema";
import { cn } from "@/lib/utils";

const DEFAULT_VALUES: LoginFormValues = {
  email: "",
  password: "",
};

const inputClassName =
  "h-11 rounded-lg border border-white/[0.08] bg-zinc-900/60 px-3.5 text-[15px] shadow-inner shadow-black/10 transition-colors placeholder:text-muted-foreground/60 focus-visible:bg-zinc-900/80";

const labelClassName =
  "text-xs font-medium uppercase tracking-wide text-muted-foreground";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const { isSubmitting } = form.formState;

  const handleSubmit = (values: LoginFormValues) => {
    console.log(values);
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        noValidate
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="gap-2">
              <FormLabel className={labelClassName}>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  autoComplete="email"
                  className={inputClassName}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="gap-2">
              <div className="flex items-center justify-between">
                <FormLabel className={labelClassName}>Contraseña</FormLabel>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                  tabIndex={0}
                >
                  ¿Has olvidado tu contraseña?
                </Link>
              </div>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Introduce tu contraseña"
                    autoComplete="current-password"
                    className={cn(inputClassName, "pr-11")}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    aria-label={
                      showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                    aria-pressed={showPassword}
                    tabIndex={0}
                    className="absolute right-1 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="mt-2 h-11 w-full rounded-lg bg-foreground text-[15px] font-medium text-background shadow-sm transition-all hover:bg-foreground/90 hover:shadow-md"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="size-4 animate-spin" />
              Iniciando sesión...
            </>
          ) : (
            "Iniciar sesión"
          )}
        </Button>
      </form>
    </Form>
  );
};
