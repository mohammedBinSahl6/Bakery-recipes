import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { Recipe } from "@prisma/client";

interface Props {
  recipe: Recipe;
}

const RecipeCardEdit = ({ recipe }: Props) => {
  return (
    <Card className="overflow-hidden">
      <Image
        src={recipe?.image as string}
        alt={`My Recipe ${recipe.id}`}
        width={300}
        height={200}
        className="w-full object-cover h-48"
      />
      <CardHeader>
        <CardTitle>My Recipe {recipe.title}</CardTitle>
        <CardDescription>Your own creation</CardDescription>
      </CardHeader>
      <CardFooter className="space-x-2">
        <Button variant="outline" asChild>
          <Link href={`/recipe/${recipe.id}`}>View</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={`/edit-recipe/${recipe.id}`}>Edit</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeCardEdit;
