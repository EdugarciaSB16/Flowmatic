import * as z from "zod";

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 50;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 72;
const PASSWORD_STRENGTH_REGEX = /^(?=.*[A-Za-z])(?=.*\d).+$/;

export const loginSchema = z.object({
  email: z.email("Introduce un email válido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(NAME_MIN_LENGTH, `El nombre debe tener al menos ${NAME_MIN_LENGTH} caracteres`)
      .max(NAME_MAX_LENGTH, `El nombre no puede superar ${NAME_MAX_LENGTH} caracteres`),
    email: z.email("Introduce un email válido"),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres`)
      .max(PASSWORD_MAX_LENGTH, `La contraseña no puede superar ${PASSWORD_MAX_LENGTH} caracteres`)
      .regex(PASSWORD_STRENGTH_REGEX, "La contraseña debe incluir letras y números"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
