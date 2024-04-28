/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {Book} from '~/app/_components/book'
import { Button } from "~/app/_components/ui/button";
import { api } from "~/trpc/server";

export default async function Club({ params }: { params: { slug: string } }) {
  const currentlyReading = await api.clubs.currentReading({
    clubId: parseInt(params.slug),
  });

  return (
    <div>
      {currentlyReading ? (
        <Book
          id={currentlyReading.bookId}
          title={currentlyReading.name}
          coverImage={currentlyReading.coverUrl}
        />
      ) : (
        <Link href="/search-books">
          <Button>Set Book</Button>
        </Link>
      )}
    </div>
  );
}


