"use client";

import { api } from "~/trpc/react";
import { Moment } from "./_components/moment";
import { Button } from "./_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./_components/ui/dialog";
import { useState } from "react";

export default function Home() {
  const { data: moments } = api.post.getLatest.useQuery();
  const { mutate: createMoment } = api.post.create.useMutation({
    onSettled: () => setMomentText(""),
  });
  const [momentText, setMomentText] = useState("");

  return (
    <main className="mx-4 my-2 flex min-h-screen max-w-lg flex-col items-center justify-start gap-4">
      <div className="flex flex-col gap-2">
        <div className="h-72 w-48 rounded-md bg-slate-200"></div>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <Dialog>
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
              onClick={() => createMoment({ name: momentText })}
              type="submit"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col gap-2">
        {moments?.map((m) => <Moment name={m.name} key={m.id} />)}
      </div>
    </main>
  );
}
