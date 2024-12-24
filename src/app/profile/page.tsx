/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { Recipe } from "@prisma/client";
import RecipeCardEdit from "@/components/recipe-card-edit/RecipeCardEdit";
import { getRecipes } from "../actions/getRecipes";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("info");
  const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);

  const { data: session } = useSession();

  useEffect(() => {
    const getMyRecipes = async () => {
      const response = await getRecipes(session?.user?.id);
      setMyRecipes(response.recipes);
    };
    getMyRecipes();
  }, [session?.user]);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">My Profile</h1>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="bg-white rounded-lg p-6 shadow-md"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="liked">Liked Recipes</TabsTrigger>
          <TabsTrigger value="my-recipes">My Recipes</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src="/cooker-avatar.webp"
                    alt="Profile picture"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">
                    {session?.user?.name}
                  </h2>
                  <p className="text-muted-foreground">
                    {session?.user?.email}
                  </p>
                </div>
              </div>
              <p>Passionate baker and recipe creator</p>
            </CardContent>
            <CardFooter>
              <Button>Edit Profile</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="liked">You can liked recipes soon</TabsContent>
        <TabsContent value="my-recipes">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myRecipes.map((recipe) => (
              <RecipeCardEdit key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
