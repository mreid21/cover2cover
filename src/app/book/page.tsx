import { Chapter } from "../_components/chapter";

export default function BookPage() {
  return (
    <div className="mx-auto my-4 flex max-w-xl flex-col gap-2">
      <Chapter number={1} />
      <Chapter number={2}/>
      <Chapter number={3} locked />
      <Chapter number={4} locked />
    </div>
  );
}

