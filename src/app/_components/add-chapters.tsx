"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

type AddChaptersProps = {
    bookReadingId: number;
};

export default function AddChapters({ bookReadingId }: AddChaptersProps) {
  const [chapters, setChapters] = useState(0);
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const { mutate: addChapters } = api.chapter.addChapters.useMutation({
    onSuccess: () => router.refresh()
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex w-full justify-start my-4">
          <Button variant="default">Add Chapters</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Chapters</DialogTitle>
        </DialogHeader>
        <Input type="number" onChange={(e) => setChapters(parseInt(e.target.value))} />
        <DialogFooter>
          <Button
            onClick={() => {
              setOpen(false);
              addChapters({numChapters: chapters, bookReadingId})
            }}
            type="submit"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}