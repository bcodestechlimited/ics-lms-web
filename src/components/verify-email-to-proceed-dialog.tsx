import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail } from "lucide-react";

export function VerifyEmailToProceedDialog() {
  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[500px] text-center">
        <DialogHeader className="flex flex-col items-center justify-center">
          <div className="flex justify-center mb-4">
            <Mail className="h-12 w-12 text-primary" />
          </div>
          <DialogTitle className="text-2xl">Verify Your Email</DialogTitle>
          <DialogDescription className="text-base text-center">
            You must confirm your email address before accessing the dashboard
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-muted-foreground">
            We've sent a verification link to your email address. Please check
            your inbox and follow the instructions to continue.
          </p>

          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm">
              Didn't receive the email? Check your spam folder or
              <br />
              contact support at support@l&d.com
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
