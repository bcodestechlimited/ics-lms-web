import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/useAuth";
import { LayoutDashboardIcon, LogOut } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";

export function UserDropdown() {
  const logout = useLogout();
  const handleLogout = () => {
    try {
      toast.promise(logout.mutateAsync(), {
        loading: "Logging out...",
        success: "Logged out successfully",
        error: "Error logging out",
      });
    } catch {
      toast.error("Error logging out");
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Avatar>
          <AvatarImage src="/assets/image/user-avatar.png" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <Link to={"/dashboard"}>
          <DropdownMenuItem className="cursor-pointer">
            <LayoutDashboardIcon className="w-4 h-4 mr-2" /> Dashboard{" "}
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          className="text-red-500 cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
