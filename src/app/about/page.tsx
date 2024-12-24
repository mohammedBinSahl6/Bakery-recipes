/* eslint-disable react/no-unescaped-entities */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">About Bakery Recipes</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gradient-to-br from-pink-500 to-purple-500 text-white">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
            <CardDescription className="text-white/80">
              Sharing the joy of baking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Bakery Recipes is a community-driven platform dedicated to sharing
              and discovering delicious bakery recipes. Our mission is to bring
              bakers of all skill levels together, providing a space to share
              their creations, learn new techniques, and explore the wonderful
              world of baking.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
          <CardHeader>
            <CardTitle>Our Story</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Founded in 2023, Bakery Recipes started as a small project by a
              group of passionate bakers who wanted to create a dedicated space
              for sharing bakery recipes. Since then, we've grown into a
              thriving community of bakers from around the world, all united by
              our love for creating delicious baked goods.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-400 to-emerald-500 text-white">
          <CardHeader>
            <CardTitle>Join Our Community</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Whether you&lsquo;re a professional baker or just starting out,
              there's a place for you in our community. Share your recipes,
              learn from others, and be inspired by the amazing creations of
              fellow bakers. Join us today and let's make the world a little
              sweeter, one recipe at a time!
            </p>
          </CardContent>
        </Card>
      </div>

      <Image width={500} height={500} src="/about.jpg" alt="About Bakery" className="mx-auto rounded-lg shadow-lg" />
    </div>
  );
}
