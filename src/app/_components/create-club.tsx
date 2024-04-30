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

type CreateClubProps = {
  userId: string;
};

export default function CreateClub({ userId }: CreateClubProps) {
  const [clubName, setClubName] = useState("");
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const { mutate: createClub } = api.clubs.create.useMutation({
    onSuccess: () => router.refresh()
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex justify-end my-4">
          <Button variant="default">Create Club</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Club</DialogTitle>
        </DialogHeader>
        <Input type="text" onChange={(e) => setClubName(e.target.value)} />
        <DialogFooter>
          <Button
            onClick={() => {
              createClub({ name: clubName, userId });
              setOpen(false);
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
