/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Recipe } from "@prisma/client";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <Card className="overflow-hidden">
      <img
        src={recipe?.image as string}
        alt={recipe.title}
        width={300}
        height={200}
        className="w-full object-cover h-48"
      />
      <CardHeader>
        <CardTitle>{recipe.title}</CardTitle>
        <CardDescription>A mouthwatering treat</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This recipe is perfect for any occasion...</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild>
          <Link href={`/recipe/${recipe.id}`}>View Recipe</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
