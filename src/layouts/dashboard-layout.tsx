import {AppSidebar} from "@/components/app-sidebar";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {UserDropdown} from "@/components/user-dropdown";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        {/* {!session.user?.isActive && <VerifyEmailToProceedDialog />} */}

        <div className="">{children}</div>
      </main>
    </SidebarProvider>
  );
}
