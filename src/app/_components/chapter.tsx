"use client";

import { type VariantProps, cva } from "class-variance-authority";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import { api } from "~/trpc/react";
import { useParams, useRouter } from "next/navigation";

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
  id: number;
  number: number;
  userId: string;
};

export function Chapter({ id, number, userId, locked = false }: ChapterProps) {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const { mutate: markChapter } = api.chapter.markRead.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const markRead = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    markChapter({ chapterId: id, userId });
  };

  return (
    <Link
      href={{ pathname: `./${params.slug}/chapter`, query: { id } }}
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
