import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/slices/userSlice";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  return (
    <div className="px-12 py-4 flex justify-between min-w-full bg-gray-900 shadow-lg shadow-gray-900/50">
      <h1 className="text-3xl font-bold text-indigo-500">Todo<span className="text-white">Bucket</span></h1>
      <NavigationMenu >
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink onClick={handleLogout} className='flex flex-row items-center gap-3 bg-gray-700 rounded-md text-white hover:text-white hover:bg-indigo-500'>
              {'Logout'}
              <LogOut className="text-white"/>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default Navbar