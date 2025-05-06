import { PageLoader } from "@/components/loading-spinner";
import { useSession } from "@/hooks/useSession";
import {useEffect} from "react";
import {Navigate, Outlet} from "react-router";

export function ProtectedLayout() {
  const {session} = useSession();
  console.log({session});

  useEffect(() => {
    console.log("session from useEffect", {session});
  }, [session]);

  if (session.status === "unauthenticated") {
    return <Navigate to="/auth/login" replace />;
  }

  if (session.status === "pending") {
    return <PageLoader />;
  }

  return <Outlet />;
}
