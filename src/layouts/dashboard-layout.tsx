import {AppSidebar} from "@/components/app-sidebar";
import {PageLoader} from "@/components/loading-spinner";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {UserDropdown} from "@/components/user-dropdown";
import {useSession} from "@/hooks/useSession";
import {useNavigate} from "react-router";
// import { VerifyEmailToProceedDialog } from "@/components/verify-email-to-proceed-dialog";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {session} = useSession();
  const navigate = useNavigate();

  if (session.status === "pending") {
    return <PageLoader />;
  } else if (session.status === "unauthenticated") {
    navigate("/auth/login");
    return;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="border-b">
          <div className="flex items-center">
            <SidebarTrigger />
            <div className="flex items-center w-full container mx-auto">
              <nav className="w-full h-16 flex items-center justify-between px-8">
                <h2 className="text-[32px] font-bold leading-normal text-[#0B2239]">
                  Dashboard
                </h2>

                <ul className="flex items-center gap-x-4">
                  {/* <li>
                    <NotificationDropdown />
                  </li> */}
                  <li>
                    <UserDropdown />
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div className="">{children}</div>
      </main>
    </SidebarProvider>
  );
}
