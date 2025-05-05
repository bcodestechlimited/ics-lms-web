import {z} from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const PasswordSchema = z
  .string({message: "Password is required"})
  .min(6, {message: "Password must be at least 6 characters long"})
  .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
    message: "Password must contain at least one special character",
  })
  .refine((val) => /\d/.test(val), {
    message: "Password must contain at least one number",
  });

export const registerSchema = z.object({
  email: z
    .string({message: "Email is required"})
    .email({message: "Invalid email format"}),
  telephone: z
    .string({message: "Telephone is required"})
    .min(10, {message: "Telephone number must be 11 digits"}),
  firstName: z.string().nonempty({message: "Firstname is required"}),
  lastName: z.string().nonempty({message: "Lastname is required"}),
  password: z
    .string({message: "Password is required"})
    .min(6, {message: "Password must be at least 6 characters long"})
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: "Password must contain at least one special character",
    })
    .refine((val) => /\d/.test(val), {
      message: "Password must contain at least one number",
    }),
});

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type PasswordFormValues = z.infer<typeof passwordSchema>;

export const ResetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const ForgotPasswordSchema = z.object({
  email: z.string().nonempty({message: "Email is required"}).email(),
});

export const UpdateUserProfileSchema = z.object({
  firstName: z.string().nonempty({message: "Firstname is required"}),
  lastName: z.string().nonempty({message: "Lastname is required"}),
  avatar: z.any().optional(),
});

export const UpdateUserPasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: PasswordSchema,
  confirmPassword: z.string(),
});