import { notFound } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { ChapterList } from "../_components/chapter-list";

export default async function BookPage() {
  const session = await getServerAuthSession();
  if (!session?.user) notFound();

  return (
    <ChapterList userId={session.user.id}/>
  );
}

