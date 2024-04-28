"use client";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import type { BookProps } from "./book";

/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BookResultProps extends BookProps {}


export function BookResult({ title, coverImage }: BookResultProps) {
  const router = useRouter();
  const { mutate: setCurrentlyReading } =
    api.clubs.setCurrentlyReading.useMutation({
      onSuccess: () => router.back(),
    });
  return (
    <div
      onClick={() =>
        setCurrentlyReading({
          name: title,
          coverUrl: coverImage,
          clubId: 1,
        })
      }
      className="flex flex-col gap-2"
    >
      {coverImage && (
        <div className="h-[170px] w-[115px] rounded-md">
          <img className="block h-full w-full" src={coverImage} alt="" />
        </div>
      )}
      <span>{title}</span>
    </div>
  );
}
