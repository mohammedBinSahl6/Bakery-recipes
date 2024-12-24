"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import ImageKit from "imagekit";


import { getCurrentUser } from "@/lib/session";
import { recipeSchema } from "../edit-recipe/EditForm";

export async function updateRecipe(
  {
    category,
    description,
    ingredients,
    instructions,
    title,
    image,
  }: z.infer<typeof recipeSchema>,
  id: string
): Promise<{ message: string; status: number }> {
  const currentUser = await getCurrentUser();
  try {
    if (!image.includes("http")) {
      const imagekit = new ImageKit({
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
        privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY as string,
        urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT as string,
      });
      imagekit.upload(
        {
          file: image as string, // can be a URL, local file path, or base64 string
          fileName: `${new Date().getTime()}.png`,
        },
        async (error, result) => {
          if (error) console.error(error);
          await prisma.recipe.update({
            where: {
              id,
            },
            data: {
              category,
              description,
              ingredients,
              instructions,
              title,
              image: result?.url as string,
              authorId: currentUser.id,
            },
          });
        }
      );

      return { message: "Recipe Updated successfully", status: 201 };
    }
    await prisma.recipe.update({
      where: {
        id,
      },
      data: {
        category,
        description,
        ingredients,
        instructions,
        title,
        authorId: currentUser.id,
      },
    });
    return { message: "Recipe Updated successfully", status: 201 };
  } catch (error) {
    return { message: `Internal server error ${error}`, status: 500 };
  }
}
