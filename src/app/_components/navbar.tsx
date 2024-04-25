import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getServerAuthSession } from "~/server/auth";

export async function Navbar() {
  const session = await getServerAuthSession()
  return (
    <div className="flex items-center justify-end border-b p-4">
      <Avatar>
        <AvatarImage src={session?.user.image ?? undefined}/>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Link
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
      >
        {session ? "Sign out" : "Sign in"}
      </Link>
    </div>
  );
}
