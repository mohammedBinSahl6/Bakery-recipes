"use server";

import prisma from "@/lib/prisma";
import { Recipe } from "@prisma/client";

export async function getRecipes(
  authorId?: string
): Promise<{ recipes: Recipe[] }> {
  try {
    if (authorId) {
      const recipes = await prisma.recipe.findMany({
        where: {
          authorId: authorId,
        },
      });
      return { recipes };
    } else {
      const recipes = await prisma.recipe.findMany();
      return { recipes };
    }
  } catch {
    return { recipes: [] };
  }
}
