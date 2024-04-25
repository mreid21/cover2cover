import { Avatar, AvatarFallback } from "./ui/avatar";
import { Ellipsis } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
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
    <div className="max-w-fit min-w-[300px] rounded-xl border bg-card p-4 text-card-foreground shadow">
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
              <ul className="cursor-pointer grid gap-1 text-sm">
                <li className="hover:bg-secondary p-1.5 rounded-md">Edit</li>
                <li className="hover:bg-secondary p-1.5 rounded-md" onClick={() => deleteMoment({id})}>Delete</li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
        <p className="ml-4 text-wrap">{content}</p>
      </div>
    </div>
  );
}
