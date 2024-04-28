/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import AddChapters from "~/app/_components/add-chapters";
import { Book } from "~/app/_components/book";
import { Button } from "~/app/_components/ui/button";
import { api } from "~/trpc/server";

export default async function Club({ params }: { params: { slug: string } }) {
  const currentlyReading = await api.clubs.currentReading({
    clubId: parseInt(params.slug),
  });

  return (
    <div className="mx-4 my-2 flex gap-4">
      {currentlyReading ? (
        <div className="flex max-w-sm flex-col gap-2">
          <Book
            readingId={currentlyReading.id}
            id={currentlyReading.bookId}
            title={currentlyReading.name}
            coverImage={currentlyReading.coverUrl}
          />
          <AddChapters bookReadingId={currentlyReading.id} />
        </div>
      ) : (
        <Link href={`./${params.slug}/search-books`}>
          <Button>Set Book</Button>
        </Link>
      )}
    </div>
  );
}
