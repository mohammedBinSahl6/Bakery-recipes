import Image from "next/image";
import React from "react";
import prisma from "@/lib/prisma";
interface Props {
  params: Promise<{ id: string }>;
}
const RecipePage = async ({ params }: Props) => {
  const id = (await params).id;

  const recipe = await prisma.recipe.findUnique({
    where: {
      id,
    },
  });
  if (!recipe) {
    return <div>No recipe found with id {id}</div>;
  }

  return (
    <div className="container">
      <Image
        src={recipe.image ?? ""}
        alt={recipe.title}
        width={500}
        height={500}
        className="w-full md:w-1/4 mx-auto rounded-xl"
      />
      <div className="flex flex-col items-center justify-center mt-8 px-10 gap-10">
        <h1 className="text-3xl font-bold text-center">{recipe.title}</h1>

        <i className="text-center text-sm text-muted-foreground">
          {recipe.description}
        </i>

        <p className="text-sm">
          <b>Ingredients:</b> <br />
          {recipe.ingredients}
        </p>
        <p className=" text-sm">
          <b>Instructions:</b>
          <br /> {recipe.instructions}
        </p>
      </div>
    </div>
  );
};

export default RecipePage;
