import { useRegister } from "@/hooks/useAuth";
import { registerSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import PasswordInput from "./password-input-field";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

export function RegisterShell() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      telephone: "",
    },
  });
  const register = useRegister();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function onSubmit(values: z.infer<typeof registerSchema>) {
    setIsLoading(true);
    try {
      const payload = {
        email: values.email.toLowerCase().trim(),
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        telephone: values.telephone,
      };
      toast.promise(register.mutateAsync(payload), {
        loading: "Creating account...",
        success: (res) => {
          if (!res.success) return "Invalid credentials";
          setIsLoading(false);
          navigate("/auth/login");
          return "Account created successfully. Please verify your email.";
        },
        error: (err) => {
          setIsLoading(false);
          return (
            err.response.data.message || "Account creation failed, Try again."
          );
        },
      });
    } catch {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="First Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Last Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telephone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Telephone" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} label="" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="bg-[#134587] w-full" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="animate-spin text-white" />
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </Form>
  );
}
