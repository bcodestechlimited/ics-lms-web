import { useSession } from "@/hooks/useSession";
import { Outlet, useNavigate } from "react-router";

const ProtectedAuthRoute = () => {
  const navigate = useNavigate();
  const {session} = useSession();

  if (session.status === "authenticated") {
    navigate("/dashboard");
    return;
  }

  return <Outlet />;
};

export default ProtectedAuthRoute;
