import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assets/images/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  return (
    <div className="max-w-full w-full drop-shadow-xl shadow-2xl bg-primary max-h-[70px]">
      <div className="flex flex-row justify-between gap-2 relative">
        <div className="w-[155px] bg-white h-[70px]">
          <div className="absolute">
            <Image src={logo} width={186} height={0} alt="AQA Logo" />
          </div>
        </div>

        <div className="mr-5 py-3 text-white">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-5 min-w-[250px]">
              <DropdownMenuItem>
                <div className="flex flex-col item-start text-left mt-1">
                  <p className="text-sm font-bold">{"Kurt"}</p>
                  <p className="text-xs text-gray">{"akdrosa@aqa.org.uk"}</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator></DropdownMenuSeparator>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
