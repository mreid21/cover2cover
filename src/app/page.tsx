"use client"
import {MomentList} from "./_components/moment-list";
import { useSearchParams } from "next/navigation";



export default function Home() {
  const qp = useSearchParams()
  return (
    <main className="mx-4 my-2 min-h-screen">
      <h3 className="text-2xl font-semibold mb-4">Chapter {qp.get('chapter')}</h3>
      <MomentList chapter={parseInt(qp.get('chapter') ?? "0")}/>
    </main>
  );
}
