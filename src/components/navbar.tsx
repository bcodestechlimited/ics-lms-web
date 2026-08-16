import {useGetUserSession} from "@/hooks/use-user";
import {Book, Briefcase, HomeIcon} from "lucide-react";
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


  return (
    <nav className="py-3 sm:py-4 border-b bg-background sticky top-0 z-40">
      <div className="flex items-center justify-between container mx-auto px-4 sm:px-6 lg:px-8">
        <Link to={"/"} className="flex-shrink-0">
          <img
            src="/assets/image/logo-black.png"
            alt="Logo"
            className="h-10 sm:h-12 md:h-14 w-auto object-contain"
          />
        </Link>

        <NavBar items={navItems} className="" />

        {session?._id ? (
          <div className="flex items-center gap-2 sm:gap-4">
            <UserDropdown />
          </div>
        ) : (
          <div className="flex items-center gap-x-2 sm:gap-x-4">
            <Link to="/auth/login">
              <Button variant="ghost" size="sm" className="sm:text-sm text-xs px-2.5 sm:px-4">
                Sign In
              </Button>
            </Link>
            <Link to="/auth/signup">
              <Button variant="default" size="sm" className="sm:text-sm text-xs px-2.5 sm:px-4">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export const GenericNavbar = () => {
  return (
    <nav className="py-3 sm:py-4 border-b bg-background sticky top-0 z-40">
      <div className="flex items-center justify-between container mx-auto px-4 sm:px-6 lg:px-8">
        <Link to={"/"} className="flex-shrink-0">
          <img
            src="/assets/image/logo-black.png"
            alt="Logo"
            className="h-10 sm:h-12 md:h-14 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-x-2 sm:gap-x-4">
          <Link to="/auth/login">
            <Button variant="ghost" size="sm" className="sm:text-sm text-xs px-2.5 sm:px-4">
              Sign In
            </Button>
          </Link>
          <Link to="/auth/signup">
            <Button variant="default" size="sm" className="sm:text-sm text-xs px-2.5 sm:px-4">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
