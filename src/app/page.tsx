/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { Button } from "@/components/ui/button";

import prisma from "@/lib/prisma";
import RecipeCard from "@/components/recipe-card/RecipeCard";
import Image from "next/image";

export default async function Home() {
  const recipes = (await prisma.recipe.findMany()).reverse();
  return (
    <div className="space-y-12 flex flex-col gap-16 px-10">
      <section className="text-center py-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to Bakery Recipes</h1>
        <p className="text-xl mb-8">
          Discover and share delicious bakery recipes
        </p>
        <Button asChild size="lg" variant="secondary">
          <Link href="/categories">Explore Recipes</Link>
        </Button>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Featured Recipes
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recipes.slice(0, 3).map((recipe, i) => (
            <RecipeCard recipe={recipe} key={i} />
          ))}
        </div>
      </section>
      <section className="flex flex-col items-center justify-center md:flex-row gap-7">
        <div className="flex flex-col items-center justify-center w-full md:w-1/2">
          <Image
            width={500}
            height={500}
            src="/passion.jpeg"
            alt="Passion cakes"
            className="mx-auto rounded-lg shadow-lg md:w-2/3 w-full"
          />
        </div>
        <div className=" w-full md:w-1/2">
          <h3 className="text-4xl font-bold mb-6">The Art and Joy of Baking</h3>
          <p className="text-center text-xl md:text-2xl text-balance ">
            <span className="text-3xl text-orange-700">We </span>are passionate
            about bakery because it is an art form that combines creativity,
            precision, and love to bring joy to others. Baking allows us to
            transform simple ingredients into delightful masterpieces, whether
            it's the comforting aroma of freshly baked bread or the intricate
            beauty of a handcrafted cake. The process of baking connects us to
            tradition, culture, and the happiness of sharing treats with family
            and friends. It's not just about making food; it's about creating
            memories, celebrating life's moments, and expressing care through
            the universal language of taste. This passion drives us to perfect
            our craft and bring smiles to those who enjoy our creations.
          </p>
        </div>
      </section>

      <span className="bg-[url('/bake-world.jpeg')]  h-lvh rounded-2xl mx-auto w-full  bg-center bg-fixed md:text-6xl text-3xl font-bold p-10 text-white text-center flex flex-col gap-12 items-center justify-center">
        Join the bakery world to share your passion, infuse recipes with
        creativity, and inspire growth in a community that thrives on the joy of
        delicious creations.
        <Button asChild size="lg" variant="secondary">
          <Link href="/create-recipe">Join and Create</Link>
        </Button>
      </span>
    </div>
  );
}
