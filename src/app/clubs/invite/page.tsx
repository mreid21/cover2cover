import { Suspense } from "react";
import SearchInput from "~/app/_components/search";
import { api } from "~/trpc/server";

export default async function ClubInvitePage({
  searchParams,
}: {
  searchParams: { username?: string };
}) {
  return (
    <div className="mx-auto my-4 w-[600px]">
      <SearchInput debounce={{duration: 100}} placeholder="find users" queryName="username" />
      {searchParams.username && (
        <Suspense>
          <UserResults query={searchParams.username ?? ""} />
        </Suspense>
      )}
    </div>
  );
}

async function UserResults({ query }: { query: string }) {
  const users = await api.user.find({ username: query });

  return (
    <ul className="shadow text-sm text-foreground">
      {users.map((user) => (
        <UserResultsItem key={user.id} id={user.id} name={user.name ?? ""} />
      ))}
    </ul>
  );
}

type UserResultsItem = {
  id: string;
  name: string;
};

function UserResultsItem({ id, name }: UserResultsItem) {
  return (
    <div className="flex flex items-center gap-4 rounded-md p-2 hover:bg-secondary cursor-pointer">
      <div className="h-6 w-6 rounded-full bg-secondary"></div>
      <span>{name}</span>
    </div>
  );
}
