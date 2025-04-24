import {Alert, AlertDescription} from "@/components/ui/alert";
import {Button} from "@/components/ui/button";
import {useActivateAccount} from "@/hooks/useAuth";
import {Loader2} from "lucide-react";
import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router";
import {toast} from "sonner";

const UserActivation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const activateUser = useActivateAccount();
  const token = searchParams.get("token");

  const handleActivation = () => {
    if (!token) {
      return "Invalid token";
    }
    setIsLoading(true);
    setError(null);
    toast.promise(activateUser.mutateAsync(token as string), {
      loading: "Activating account...",
      success: (res) => {
        if (!res.success) {
          return "Error activating account";
        }
        setIsLoading(false);
        setError(null);
        navigate("/auth/login");
        setIsActivated(true);
        return "Account activated successfully";
      },
      error: () => {
        setError("Error activating account");
        return "An error occured, please try again";
      },
    });
  };

  useEffect(() => {
    if (!token) {
      setError("No activation token found");
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Account Activation</h1>

        {!isActivated && (
          <div className="space-y-4">
            <p className="text-gray-600 text-center">
              Click the button below to activate your account
            </p>

            <Button
              onClick={handleActivation}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Activating...
                </>
              ) : (
                "Activate Account"
              )}
            </Button>
          </div>
        )}

        {isActivated && (
          <Alert variant="default">
            <AlertDescription className="text-center">
              Account activated successfully! You can now log in.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription className="text-center">{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default UserActivation;
