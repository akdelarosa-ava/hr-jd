import { LucideBookUser } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import logo from "public/logo_blue.jpg";
type Props = {
  title: string;
};

const PageTitle = ({ title }: Props) => {
  return (
    <>
      <div className="flex flex-row mb-5">
        <div className="w-10 mr-3">
          <Avatar className="-z-1">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full flex flex-col item-start text-left">
          <p className="text-sm font-bold text-gray-500">{"You"}</p>
          <p className="text-sm text-gray">{title}</p>
        </div>
      </div>
      <div className="flex flex-row mb-5">
        <div className="w-10 mr-3">
          <Avatar className="-z-1">
            <AvatarImage src="/logo_blue.jpg" />
            <AvatarFallback>AQA</AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full flex flex-col item-start text-left">
          <p className="text-sm text-gray py-3">
            Please complete all required fields below to generate results:
          </p>
        </div>
      </div>
      <div className="flex flex-row mb-10">
        <div className="w-10 mr-3"></div>
        <div className="w-full flex flex-row item-start text-left">
          <p className="flex flex-row font-semibold text-sm text-blue-600 cursor-pointer gap-1 hover:text-blue-800">
            <LucideBookUser /> <span className="">Open User Guide</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default PageTitle;
