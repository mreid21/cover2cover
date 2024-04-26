import { getServerAuthSession } from "~/server/auth";
import CreateClub from "./_components/create-club";
import { api } from "~/trpc/server";
import Club from "./_components/club";

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
            <Club key={c.id} id={c.id} name={c.name} ownerId={c.ownerId} />
          ))}
        </div>
      </div>
    </div>
  );
}


