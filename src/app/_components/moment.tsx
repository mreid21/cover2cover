import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function Moment({ name, content }: { name: string; content: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Example Post</CardTitle>
        <CardDescription>150/300</CardDescription>
      </CardHeader>
      <CardContent className="text">
        <p>{name}</p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-start gap-2">
          <Avatar size="sm">
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>username</p>
        </div>
      </CardFooter>
    </Card>
  );
}
