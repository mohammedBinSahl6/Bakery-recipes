"use client";

import React from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { createRecipe } from "../actions/createRecipe";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const recipeSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(100, {
      message: "Title must not exceed 100 characters.",
    }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(500, {
      message: "Description must not exceed 500 characters.",
    }),
  ingredients: z
    .string()
    .min(10, {
      message: "Ingredients must be at least 10 characters.",
    })
    .max(1000, {
      message: "Ingredients must not exceed 1000 characters.",
    }),
  instructions: z
    .string()
    .min(20, {
      message: "Instructions must be at least 20 characters.",
    })
    .max(2000, {
      message: "Instructions must not exceed 2000 characters.",
    }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  image: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
    .optional(),
});

const CreateForm = () => {
  const [image, setImage] = useState<string | null>(null);

  const { data: session } = useSession();

  const form = useForm<z.infer<typeof recipeSchema>>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: "",
      description: "",
      ingredients: "",
      instructions: "",
      category: "",
    },
  });

  const onImageProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result as string;
      setImage(base64Image as string);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (values: z.infer<typeof recipeSchema>) => {
    const response = await createRecipe({
      ...values,
      image: image as string,
    });
    if (response.status === 201) {
      toast({
        title: "Success",
        description: response?.message,
      });
      form.reset();
    } else {
      toast({
        title: "Error",
        description: response?.message,
        variant: "destructive",
      });
    }
  };

  if (!session) {
    return (
      <div className="text-center mt-8">Please sign in to create a recipe.</div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipe Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter recipe title" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of your recipe.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your recipe" {...field} />
              </FormControl>
              <FormDescription>
                Provide a brief description of your recipe.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredients</FormLabel>
              <FormControl>
                <Textarea placeholder="List your ingredients" {...field} />
              </FormControl>
              <FormDescription>
                List all ingredients, one per line.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea placeholder="Write your instructions" {...field} />
              </FormControl>
              <FormDescription>
                Provide step-by-step instructions for your recipe.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="cakes">Cakes</SelectItem>
                  <SelectItem value="cookies">Cookies</SelectItem>
                  <SelectItem value="breads">Breads</SelectItem>
                  <SelectItem value="pastries">Pastries</SelectItem>
                  <SelectItem value="pies">Pies</SelectItem>
                  <SelectItem value="muffins">Muffins</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the category that best fits your recipe.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Input type="file" accept="image/*" onChange={onImageProfileChange} />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Creating Recipe..." : "Create Recipe"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateForm;
