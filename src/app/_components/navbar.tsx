import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getServerAuthSession } from "~/server/auth";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export async function Navbar() {
  const session = await getServerAuthSession();
  return (
    <div className="flex items-center justify-end border-b p-4">
      <Popover>
        <PopoverTrigger>
          <Avatar>
            <AvatarImage src={session?.user.image ?? undefined} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent align="end">
          <ul className="grid cursor-pointer gap-1 text-sm">
            <Link className="rounded-md p-1.5 hover:bg-secondary" href="/">
              Home
            </Link>
            <Link className="rounded-md p-1.5 hover:bg-secondary" href="/invites">
              Invites
            </Link>
            <Link
              className="rounded-md p-1.5 hover:bg-secondary"
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
            
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}
