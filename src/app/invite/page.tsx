import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import jwt from "jsonwebtoken";
import { z } from "zod";
import dayjs from "dayjs";

const inviteSchema = z.object({
  clubId: z.coerce.number(),
  exp: z.coerce.number(),
  iat: z.coerce.number(),
});

export default async function InvitePage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  if (!searchParams.token) return notFound();

  const invite = await api.clubs.join({ token: searchParams.token });

  if (!invite) return notFound();

  const decoded = inviteSchema.parse(jwt.decode(invite.token));
  const expired = dayjs.unix(decoded.exp).isBefore(dayjs());

  return (
    <div className="mx-auto my-4 max-w-md border p-4 text-xl">
      {expired ? (
        <h2 className="text-lg">
          This invite has expired please create a new one.
        </h2>
      ) : (
        <h2>Adding you to the club...</h2>
      )}
    </div>
  );
}
