import {ForgotPasswordForm} from "@/components/forgot-password-shell";
import {GenericNavbar} from "@/components/navbar";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-gray-50">
      <GenericNavbar />

      <main className="flex-1 grid place-items-center overflow-hidden">
        <div className="w-full max-w-md rounded-lg border bg-white p-4 md:p-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold">Forgot Password</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email address and we’ll send you a link to reset your
              password.
            </p>
          </div>

          <div className="mt-6">
            <ForgotPasswordForm />
          </div>
        </div>
      </main>
    </div>
  );
}
