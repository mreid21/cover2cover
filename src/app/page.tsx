import { getServerAuthSession } from "~/server/auth";
import CreateClub from "./_components/create-club";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./_components/ui/card";
import { api } from "~/trpc/server";

export default async function Home() {
  return (
    <main className="mx-4 my-2 flex min-h-screen flex-col items-center">
      <ClubList/>
    </main>
  );
}
async function ClubList() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const clubs = await api.clubs.getAll();

  return (
    <div className="max-w-max">
      <div className="my-4 self-start">
        <CreateClub userId={session.user.id} />
        <div className="mx-2 grid gap-4 md:grid-cols-2">
          {clubs.map((c) => (
            <Club key={c.id} name={c.name} ownerId={c.ownerId} />
          ))}
        </div>
      </div>
    </div>
  );
}

type ClubProps = {
  name: string,
  ownerId: string
}
function Club({name}: ClubProps) {
  return (
    <Card className="flex min-h-[100px] w-[300px]">
      <CardContent className="relative basis-12 px-2">
        <div className="absolute -left-2 -top-1 h-24 w-16 rounded-md bg-secondary shadow"></div>
      </CardContent>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>A cool palce to hang out </CardDescription>
      </CardHeader>
    </Card>
  );
}
