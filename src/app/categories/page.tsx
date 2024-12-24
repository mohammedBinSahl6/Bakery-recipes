import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const categories = [
  {
    name: "Cakes",
    description: "Delicious cakes for all occasions",
    color: "from-pink-500 to-red-500",
  },
  {
    name: "Cookies",
    description: "Crunchy and chewy cookies",
    color: "from-yellow-400 to-orange-500",
  },
  {
    name: "Breads",
    description: "Freshly baked breads and rolls",
    color: "from-amber-500 to-yellow-500",
  },
  {
    name: "Pastries",
    description: "Flaky and sweet pastries",
    color: "from-green-400 to-emerald-500",
  },
  {
    name: "Pies",
    description: "Savory and sweet pies",
    color: "from-blue-400 to-indigo-500",
  },
  {
    name: "Muffins",
    description: "Perfect for breakfast or snacks",
    color: "from-purple-400 to-pink-500",
  },
];

export default function CategoriesPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">Recipe Categories</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card
            key={category.name}
            className={`overflow-hidden bg-gradient-to-r ${category.color}`}
          >
            <CardHeader className="text-white">
              <CardTitle className="text-2xl">{category.name}</CardTitle>
              <CardDescription className="text-white/80">
                {category.description}
              </CardDescription>
            </CardHeader>
            <CardFooter className="bg-white/20 backdrop-blur-sm">
              <Button variant="secondary" asChild>
                <Link href={`/categories/${category.name.toLowerCase()}`}>
                  View Recipes
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
