import {useGetUserSession} from "@/hooks/use-user";
import {Book, Briefcase, FileText, HomeIcon} from "lucide-react";
import {Link, useLocation} from "react-router";
import {NavBar} from "./tubelight-navbar";
import {Button} from "./ui/button";
import {UserDropdown} from "./user-dropdown";

export function Navbar() {
  const {data: session} = useGetUserSession();
  const location = useLocation();

  const currentPath = location.pathname.replace(/\/+$/, "");
  const ignoreNavbarPaths = [
    "/auth/login",
    "/auth/signup",
    "/dashboard",
    "/auth/staff-onboarding",
    "/course-checkout",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/auth/user/activate",
  ];

  const shouldHideNavbar =
    ignoreNavbarPaths.some((path) => currentPath === path) ||
    currentPath.startsWith("/dashboard/") ||
    currentPath.startsWith("/auth/verify");
  // currentPath.startsWith("/course-checkout/");

  if (shouldHideNavbar) {
    return null;
  }

  const navItems = [
    {name: "Home", url: "/", icon: HomeIcon},
    {name: "Courses", url: "/courses", icon: Book},
    {name: "About", url: "/about", icon: Briefcase},
    // {name: "Blog", url: "#", icon: FileText},
  ];

  console.log({session});

  return (
    <nav className="py-1 border-b">
      <div className="flex items-center justify-between container mx-auto">
        <Link to={"/"}>
          <img src="/assets/image/logo.svg" alt="Logo" />
        </Link>

        <NavBar items={navItems} className="" />

        {session?._id ? (
          <div className="flex items-center gap-4">
            {/* <Link to="/dashboard">
              <Button>Dashboard</Button>
            </Link> */}
            <UserDropdown />
          </div>
        ) : (
          <div className="flex items-center gap-x-4">
            <Link to="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/auth/signup">
              <Button variant="default">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
