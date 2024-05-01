import { notFound } from "next/navigation";
import { MomentList } from "~/app/_components/moment-list";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Chapter({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  if (!searchParams.id) return notFound();

  const chapter = await api.chapter.byId({ id: parseInt(searchParams.id) });
  const session = await getServerAuthSession();
  if (!chapter || !session?.user.id) return notFound();

  return (
    <main className="mx-4 my-2 h-full">
      <h3 className="mb-4 text-2xl font-semibold">Chapter {chapter.number}</h3>
      <MomentList userId={session.user.id} chapterId={chapter.id} />
    </main>
  );
}
