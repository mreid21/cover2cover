"use client";

import { type VariantProps, cva } from "class-variance-authority";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const chapterVariants = cva(
  "flex text-sm justify-between min-h-16 items-center shadow rounded-md p-4",
  {
    variants: {
      locked: {
        true: "text-muted-foreground pointer-events-none",
        false: "text-card-foreground hover:bg-secondary",
      },
    },
  },
);

type ChapterProps = VariantProps<typeof chapterVariants> & {
  number: number;
};

export function Chapter({ number, locked = false }: ChapterProps) {
  const markRead = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <Link
      href={`/?chapter=${number}`}
      aria-disabled={locked!}
      tabIndex={locked ? -1 : 0}
      className={chapterVariants({ locked })}
    >
      <p>Chapter {number}</p>
      {locked && (
        <Button
          onClick={markRead}
          className="pointer-events-auto flex items-center gap-1"
          size="sm"
          variant="outline"
        >
          <span>Read</span>
          <Check size={14} />
        </Button>
      )}
    </Link>
  );
}
