import { redirect } from "next/navigation";
import { MomentList } from "../../_components/moment-list";

export default async function Chapter({
  searchParams,
}: {
  searchParams: { number?: string };
}) {

  const {number: chapter} = searchParams
  if (!chapter) redirect('/books')

  return (
    <main className="mx-4 my-2 min-h-screen">
      <h3 className="mb-4 text-2xl font-semibold">
        Chapter {chapter}
      </h3>
      <MomentList chapter={parseInt(chapter)}/>
    </main>
  );
}


