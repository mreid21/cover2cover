import { RedirectType, notFound, redirect } from "next/navigation";
import { api } from "~/trpc/server";



export default async function InvitePage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  if (!searchParams.token) return notFound();

  const callbackUrl= await api.clubs.join({ token: searchParams.token });

  redirect(callbackUrl, RedirectType.replace)


  return (
    <div className="mx-auto my-4 max-w-md border p-4 text-xl">
     
    </div>
  );
}
