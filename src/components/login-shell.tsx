import {useLogin} from "@/hooks/useAuth";
import {loginSchema} from "@/schema/auth.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Loader2} from "lucide-react";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router";
import {toast} from "sonner";
import {z} from "zod";
import PasswordInput from "./password-input-field";
import {Button} from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {Input} from "./ui/input";

const token = import.meta.env.VITE_AUTH_TOKEN || "accessToken";

export function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const login = useLogin();

  function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    try {
      const payload = {
        email: values.email.toLowerCase(),
        password: values.password,
      };

      toast.promise(login.mutateAsync(payload), {
        loading: "Logging in...",
        id: "login",
        success: (res) => {
          if (!res.success) throw new Error("Invalid credentials");
          if (!res.responseObject.user.isEmailVerified) {
            throw new Error("Please verify your email");
          }
          if (!res.responseObject.user.isActive) {
            throw new Error("Your account is inactive");
          }

          setIsLoading(false);
          localStorage.setItem(token, res.responseObject.token);
          const from = location.state?.from || "/";
          navigate(from);
          window.location.reload();
          return "Login successful";
        },
        error: (res) => {
          setIsLoading(false);
          return res?.message || "Login failed, invalid credentials.";
        },
      });
    } catch {
      setIsLoading(false);
      toast("Login failed, Try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
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
          name="password"
          render={({field}) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  label=""
                  placeholder="Enter your password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="bg-[#134587] w-full" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="animate-spin text-white" />
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
}
