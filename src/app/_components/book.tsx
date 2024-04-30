"use client";

/* eslint-disable @next/next/no-img-element */
export interface BookProps {
  id: string | null;
  title: string;
  coverImage: string | null;
  authors?: string[];
}

export function Book({ title, coverImage }: BookProps) {
  return (
      <div className="flex flex-col gap-2">
        {coverImage && (
          <div className="h-[170px] w-[115px] rounded-md">
            <img className="block h-full w-full" src={coverImage} alt="" />
          </div>
        )}
        <span>{title}</span>
      </div>
  );
}
