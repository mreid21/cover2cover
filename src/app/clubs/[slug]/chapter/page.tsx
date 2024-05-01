import { notFound } from "next/navigation";
import { MomentList } from '~/app/_components/moment-list';
import { getServerAuthSession } from "~/server/auth";

export default async function Chapter({
  searchParams,
}: {
  searchParams: { id?: string };
}) {

  const {id: chapterId} = searchParams
  const session = await getServerAuthSession()
  if (!chapterId || !session?.user.id) return notFound()

  return (
    <main className="mx-4 my-2 h-full">
      <h3 className="mb-4 text-2xl font-semibold">
        Chapter
      </h3>
      <MomentList userId={session.user.id} chapterId={parseInt(chapterId)}/>
    </main>
  );
}


