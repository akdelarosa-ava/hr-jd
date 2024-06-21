import Image from "next/image";
import React from "react";
import logo from "@/assets/images/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { handleLogout } from "@/msal/msal";
import { getLoggedInUser } from "@/msal/user-helper";
import UserPhoto from "./user-photo";

const Navbar = () => {
  const user = getLoggedInUser();
  return (
    <div className="sticky top-0 max-w-full w-full drop-shadow-xl shadow-2xl bg-primary max-h-[70px] z-10">
      <div className="flex flex-row justify-between gap-2 relative">
        <div className="w-[155px] bg-white h-[70px]">
          <div className="absolute">
            <Image src={logo} width={186} height={0} alt="AQA Logo" />
          </div>
        </div>

        <div className="mr-5 py-3 text-white">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <UserPhoto user={user} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-5 min-w-[250px]">
              <DropdownMenuItem>
                <div className="flex flex-col item-start text-left mt-1">
                  <p className="text-sm font-bold">{user?.name}</p>
                  <p className="text-xs text-gray">{user?.username}</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator></DropdownMenuSeparator>
              <DropdownMenuItem onClick={() => handleLogout('redirect')}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
