import { notFound } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { Chapter } from "~/app/_components/chapter";

export default async function BookPage({searchParams}: {searchParams: {readingId?: string}}) {
  const session = await getServerAuthSession();
  if (!session?.user || !searchParams?.readingId) notFound();

  return <ChapterList bookReadingId={parseInt(searchParams.readingId)} userId={session.user.id} />;
}

type ChapterListProps = {
  userId: string;
  bookReadingId: number
};
async function ChapterList({ userId, bookReadingId }: ChapterListProps) {
  const chapters = await api.chapter.getAll({ userId, bookReadingId });

  return (
    <div className="mx-auto my-4 flex max-w-xl flex-col gap-2">

      {chapters.map((c) => (
        <Chapter
          id={c.chapter.id}
          key={c.chapter.id}
          number={c.chapter.number}
          userId={userId}
          locked={
            c.chapters_read_by?.userId
              ? c.chapters_read_by.userId !== userId
              : true
          }
        />
      ))}
    </div>
  );
}
