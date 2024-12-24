import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "POST") {
    const { title, description, ingredients, instructions, category, image } =
      req.body;

    try {
      const recipe = await prisma.recipe.create({
        data: {
          title,
          description,
          ingredients,
          instructions,
          category,
          image,
          author: { connect: { id: session?.user?.id } },
        },
      });

      res.status(201).json(recipe);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  } else if (req.method === "GET") {
    try {
      const recipes = await prisma.recipe.findMany({
        include: { author: { select: { name: true } } },
      });

      res.status(200).json(recipes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
