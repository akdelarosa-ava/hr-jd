import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  title: string;
};

const PageTitle = ({ title }: Props) => {
  return (
    <div className="flex flex-row mb-10">
      <div className="w-10 mr-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>AR</AvatarFallback>
        </Avatar>
      </div>
      <div className="w-full flex flex-col item-start text-left">
        <p className="text-sm font-bold">{"Kurt"}</p>
        <p className="text-sm text-gray">{title}</p>
      </div>
    </div>
  );
};

export default PageTitle;
