import prisma from "@/lib/prisma";
import RecipeCard from "@/components/recipe-card/RecipeCard";

export default async function ExplorePage() {
  const allRecipes = await prisma.recipe.findMany();
  return (
    <div className="container">
      <h1 className="text-4xl font-bold text-center mb-10">
        Explore all recipes
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto px-10">
        {allRecipes
          .map((recipe) => <RecipeCard recipe={recipe} key={recipe.id} />)
          .reverse()}
      </div>
    </div>
  );
}
