import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./_components/ui/card";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col gap-2 max-w-md">
        <Moment />
        <Moment />
        <Moment />
      </div>
    </main>
  );
}

function Moment() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Example Post</CardTitle>
        <CardDescription>150/300</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe,
          commodi eius autem atque, quo illo accusamus quod quasi ratione velit
          delectus unde fuga porro numquam!
        </p>
      </CardContent>
      <CardFooter>
        <p>username</p>
      </CardFooter>
    </Card>
  );
}
