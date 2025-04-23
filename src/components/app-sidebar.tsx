import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {Home, ShieldCheckIcon, CircleFadingArrowUpIcon} from "lucide-react";
import {Link} from "react-router";

export function AppSidebar() {
  const items = [
    {
      title: "Courses",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Certificates",
      url: "#",
      icon: ShieldCheckIcon,
    },
    {
      title: "Expired Courses",
      url: "/dashboard/expired-courses",
      icon: CircleFadingArrowUpIcon,
    },
  ];
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-8">
            <Link to={"/"}>
              <img src="/assets/image/logo.svg" className="h-[70px]" />
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    disabled={item.title === "Profile"}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="relative">
          <div className="absolute left-[35%] top-[-20%]">
            <img
              src="/assets/image/dashboard-footer-icon.svg"
              alt="Dashboard footer icon about learning"
              className=""
            />
          </div>
          <div className="bg-[#0269d0] text-white rounded-xl pt-8 p-4">
            <div className="space-y-4 flex flex-col items-center justify-center">
              <h4 className="text-center font-bold text-[14px]">
                You are on the right path
              </h4>
              <p className="text-center text-[12px] font-medium">
                Education is the passport to the future, for tomorrow belongs to
                those who prepare for it today.
              </p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
