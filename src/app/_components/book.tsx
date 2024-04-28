"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

/* eslint-disable @next/next/no-img-element */
export interface BookProps {
  id: string | null;
  readingId: number;
  title: string;
  coverImage: string | null;
  authors?: string[];
}

export function Book({ title, coverImage, readingId }: BookProps) {
  const params = useParams<{ slug: string }>();
  return (
    <Link href={`./${params.slug}/book?readingId=${readingId}`}>
      <div className="flex flex-col gap-2">
        {coverImage && (
          <div className="h-[170px] w-[115px] rounded-md">
            <img className="block h-full w-full" src={coverImage} alt="" />
          </div>
        )}
        <span>{title}</span>
      </div>
    </Link>
  );
}
