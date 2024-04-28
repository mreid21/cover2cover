import { redirect } from "next/navigation";
import { MomentList } from '~/app/_components/moment-list';

export default async function Chapter({
  searchParams,
}: {
  searchParams: { id?: string };
}) {

  const {id: chapterId} = searchParams
  if (!chapterId) redirect('/books')

  return (
    <main className="mx-4 my-2 min-h-screen">
      <h3 className="mb-4 text-2xl font-semibold">
        Chapter
      </h3>
      <MomentList chapterId={parseInt(chapterId)}/>
    </main>
  );
}


