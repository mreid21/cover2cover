/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import AddChapters from "~/app/_components/add-chapters";
import { Book } from "~/app/_components/book";
import { Button } from "~/app/_components/ui/button";
import { api } from "~/trpc/server";

export default async function Club({ params }: { params: { slug: string } }) {
  const club = await api.clubs
    .overview({
      clubId: parseInt(params.slug),
    })
  

  return (
    <div className="mx-4 my-2 flex gap-2">
      <h2>{}</h2>
      {club?.currentlyReading ? (
        <div className="flex max-w-sm flex-col gap-2">
          <Book
            id={club.currentlyReading.id.toString()}
            title={club.currentlyReading.name}
            coverImage={club.currentlyReading.coverUrl}
          />
          <Link href={`./${params.slug}/book?readingId=${club.currentlyReading.id}`}>
            <Button variant="outline">Go To</Button>
          </Link>
          <AddChapters bookReadingId={club.currentlyReading.id} />
        </div>
      ) : (
        <Link href={`./${params.slug}/search-books`}>
          <Button>Set Book</Button>
        </Link>
      )}
    </div>
  );
}
