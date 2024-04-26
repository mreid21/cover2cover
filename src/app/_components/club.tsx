import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";

type ClubProps = {
  id: number; 
  name: string;
  ownerId: string;
};

export default async function Club({ id, name }: ClubProps) {
  return (
    <Link href={`./clubs/${id}`}>
      <Card className="flex min-h-[100px] w-[300px]">
        <CardContent className="relative basis-12 px-2">
          <div className="absolute -left-2 -top-1 h-24 w-16 rounded-md bg-secondary shadow"></div>
        </CardContent>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>A cool palce to hang out </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
