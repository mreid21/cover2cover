import { Avatar, AvatarFallback } from "./ui/avatar";
import { Ellipsis } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { api } from "~/trpc/react";

type MomentProps = {
  id: number;
  content: string;
};

export function Moment({ id, content }: MomentProps) {
  const utils = api.useUtils();

  const { mutate: deleteMoment } = api.moment.delete.useMutation({
    onSuccess: () => utils.moment.getForChapter.invalidate(),
  });
  return (
    <div className="max-w-fit rounded-xl border bg-card p-4 text-card-foreground shadow">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar size="sm">
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>usernameugh</span>
          </div>
          <Popover>
            <PopoverTrigger>
              <div className="flex items-center justify-center rounded-xl p-1 hover:shadow">
                <Ellipsis size={16} />
              </div>
            </PopoverTrigger>
            <PopoverContent align="start">
              <ul className="cursor-pointer text-sm">
                <li className="my-1">Edit</li>
                <Separator />
                <li onClick={() => deleteMoment({id})} className="my-1">Delete</li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
        <p className="ml-4 text-wrap">{content}</p>
      </div>
    </div>
  );
}
