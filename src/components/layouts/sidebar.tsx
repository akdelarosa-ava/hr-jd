"use client";

import { Dispatch, SetStateAction } from "react";
import {
  LuMenu,
  LuMessageSquare,
  LuMessageSquarePlus,
  LuHelpCircle,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";

type Props = {
  expand: boolean;
  setExpand: Dispatch<SetStateAction<boolean>>;
};
const Sidebar = ({ expand, setExpand }: Props) => {
  return (
    <nav
      className={`${
        expand ? "min-w-[280px] max-w-[280px]" : "min-w-[80px] max-w-[80px]"
      } min-h-screen h-full rounded-none text-white duration-200 p-5 ease-in-out flex flex-col`}
    >
      <div className="w-full mb-10">
        <Button
          variant={"ghost"}
          onClick={() => setExpand(!expand)}
          className="m-0 p-0 w-10"
        >
          <LuMenu className="text-2xl" />
        </Button>
      </div>

      <div className="grow mb-5">
        <Button className="w-full mb-5 bg-gray-50 bg-opacity-15 hover:bg-gray-100 hover:text-secondary p-2 h-10 rounded-full">
          <LuMessageSquarePlus className="text-2xl" />
          <span
            className={`${
              expand ? "" : "hidden"
            } ml-2 text-base whitespace-pre`}
          >
            New Chat
          </span>
        </Button>

        <div
          className={`${
            expand
              ? "transition duration-200 ease-in-out"
              : "hidden duration-200 ease-in-out"
          } ml-2 text-base whitespace-pre`}
        >
          <h2 className="text-2xl mb-3">Recent</h2>
          <ul className="">
            <li className="flex flex-row mb-3 text-gray-300 hover:text-white">
              <LuMessageSquare className="text-2xl" />
              <span className="ml-3">Poject Manager</span>
            </li>
            <li className="flex flex-row mb-3 text-gray-300 hover:text-white">
              <LuMessageSquare className="text-2xl" />
              <span className="ml-3">Srum Master</span>
            </li>
            <li className="flex flex-row mb-3 text-gray-300 hover:text-white">
              <LuMessageSquare className="text-2xl" />
              <span className="ml-3">Developer</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-stretch mb-5">
        <Button className="bg-gray-50 bg-opacity-15 hover:bg-gray-100 hover:text-secondary p-2 h-10 rounded-full w-full self-end">
          <LuHelpCircle className="text-2xl" />
          <span
            className={`${
              expand ? "" : "hidden"
            } ml-2 text-base whitespace-pre`}
          >
            Help
          </span>
        </Button>
      </div>
    </nav>
  );
};

export default Sidebar;
