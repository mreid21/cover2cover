'use client'

import { useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function CreateMoment() {
  const utils = api.useUtils();
  const { mutate: createMoment } = api.post.create.useMutation({
    onSettled: () => setMomentText(""),
    onSuccess: () => utils.post.getLatest.invalidate(),
  });
  const [momentText, setMomentText] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex w-full justify-start">
          <Button variant="default">Add Moment</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Moment</DialogTitle>
        </DialogHeader>
        <textarea
          onChange={(e) => setMomentText(e.target.value)}
          name=""
          id=""
          cols={10}
          rows={10}
        ></textarea>
        <DialogFooter>
          <Button
            onClick={() => {
              createMoment({ name: "New Post", content: momentText });
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
