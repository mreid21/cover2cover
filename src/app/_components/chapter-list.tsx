import { api } from "~/trpc/server";
import { Chapter } from "./chapter";

type ChapterListProps = {
  userId: string;
};
export async function ChapterList({ userId }: ChapterListProps) {
  const chapters = await api.chapter.getAll({userId});

  return (
    <div className="mx-auto my-4 flex max-w-xl flex-col gap-2">
        {JSON.stringify(chapters)}
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
