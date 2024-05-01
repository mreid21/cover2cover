"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { api } from "~/trpc/react";
import { Copy } from "lucide-react";

type InviteLinkGeneratorProps = {
  clubId: number;
};

export default function InviteLinkGenerator({
  clubId,
}: InviteLinkGeneratorProps) {
  const [open, setOpen] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const { mutate: generateLink } = api.clubs.invite.useMutation({
    onSuccess: (data) => setInviteLink(data),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex">
          <Button className="basis-full" variant="outline">Invite</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="flex max-w-[400px] flex-col gap-2">
        <DialogHeader>
          <DialogTitle>Generating Invite Link...</DialogTitle>
        </DialogHeader>
        <div className="flex w-full items-center gap-2">
          <p className="flex-1 overflow-x-hidden truncate text-nowrap rounded-md min-h-9 border p-2">
            {inviteLink}
          </p>
          <CopyToClipboardButton text={inviteLink}/>
        </div>
        <DialogFooter>
            <Button onClick={() => generateLink({clubId})}>Generate</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const CopyToClipboardButton = ({ text }: {text: string}) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      // Optionally, you can show a success message or perform other actions here
    } catch (error) {
      // Optionally, you can show an error message or handle the error in another way
    }
  };

  return (
    <Button onClick={copyToClipboard} variant="outline">
      <Copy size={14} />
    </Button>
  );
};
