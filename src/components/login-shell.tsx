import {useLogin} from "@/hooks/useAuth";
import {loginSchema} from "@/schema/auth.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Loader2} from "lucide-react";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router";
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
import {useCookies} from "react-cookie";

export interface CookieValues {
  accessToken?: string;
}

export function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const login = useLogin();
  const [cookies, setCookie] = useCookies<"accessToken", CookieValues>([
    "accessToken",
  ]);

  console.log(cookies);

  function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    try {
      const payload = {
        email: values.email.toLowerCase(),
        password: values.password,
      };

      toast.promise(login.mutateAsync(payload), {
        loading: "Logging in...",
        success: (res) => {
          console.log({res});
          if (!res.success) return "Invalid credentials";
          if (!res.responseObject.user.isActive) {
            return "Your account is inactive";
          }
          setCookie("accessToken", res.responseObject.token);

          setIsLoading(false);
          navigate("/dashboard");

          return "Login successful";
        },
        error: (res) => {
          setIsLoading(false);
          return (
            res?.response?.data?.message || "Login failed, invalid credentials."
          );
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
