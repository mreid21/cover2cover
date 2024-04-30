/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import AddChapters from "~/app/_components/add-chapters";
import { Book } from "~/app/_components/book";
import { Chapter } from "~/app/_components/chapter";
import { Button } from "~/app/_components/ui/button";
import { cn } from "~/lib/utils";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Club({ params }: { params: { slug: string } }) {
  const club = await api.clubs.overview({
    clubId: parseInt(params.slug),
  });

  return (
    <div className="mx-auto my-2 flex flex-col items-center gap-2">
      <h2 className="text-2xl">{club.name}</h2>
      {club?.currentlyReading ? (
        <div className="flex min-w-[600px] gap-8">
          <div className="flex flex-col gap-2">
            <Book
              id={club.currentlyReading.id.toString()}
              title={club.currentlyReading.name}
              coverImage={club.currentlyReading.coverUrl}
            />
            <div className="flex flex-col gap-1">
              <MemberStack members={club.usersToClubs} />
              <span className="text-sm text-muted-foreground">
                {club.usersToClubs?.length ?? 0}{" "}
                {club.usersToClubs?.length === 1 ? "member" : "members"}
              </span>
            </div>
            <Link href={`./${8}/invite`}>
              <Button className="w-full" variant="outline">
                Invite
              </Button>
            </Link>
            <AddChapters bookReadingId={club.currentlyReading.id} />
          </div>
          <Suspense fallback={<span>loading..</span>}>
            <ChapterList
              className="basis-full"
              bookReadingId={club.currentlyReading.id}
            />
          </Suspense>
        </div>
      ) : (
        <Link href={`./${params.slug}/search-books`}>
          <Button>Set Book</Button>
        </Link>
      )}
    </div>
  );
}

async function ChapterList({
  bookReadingId,
  className,
}: {
  bookReadingId: number;
  className?: string;
}) {
  const session = await getServerAuthSession();
  const userId = session?.user.id;
  if (!userId) return notFound();

  const chapters = await api.chapter.getAll({ userId, bookReadingId });
  return (
    <div className={cn(className, "mx-auto my-4 flex max-w-xl flex-col gap-2")}>
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

function MemberStack({
  members,
}: {
  members: Awaited<ReturnType<typeof api.clubs.overview>>["usersToClubs"];
}) {
  return (
    <div className="w-md relative h-8">
      {members?.map((member, index) => (
        <div
          key={member.user.id}
          style={{ left: `${index * 15}%` }}
          className={cn(`z-${index * 10} absolute h-8 w-8 rounded-full border`)}
        >
          <img
            className="rounded-full object-cover"
            src={member.user.image ?? ""}
            alt="no image"
          />
        </div>
      ))}
    </div>
  );
}
