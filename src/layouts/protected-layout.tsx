import {PageLoader} from "@/components/loading-spinner";
import {useValidateUser} from "@/hooks/useAuth";
import {Navigate, Outlet} from "react-router";
import {toast} from "sonner";

const token = import.meta.env.VITE_AUTH_TOKEN || "accessToken";
export function ProtectedLayout() {
  const {data, isLoading, isError} = useValidateUser();

  const user = data;

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError || !user) {
    toast.error("Please login", {
      id: "unique",
    });
    localStorage.removeItem(token);
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}
