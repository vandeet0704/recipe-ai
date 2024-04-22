"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Label } from "./ui/label";

const formSchema = z.object({
  file: z.instanceof(FileList),
});

export default function Recipe() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const fileRef = form.register("file");

  const [response, setResponse] = useState<string | null>(null);
  const [dishName, setDishName] = useState<string>("Paneer Butter Masala"); // Replace "Pasta" with your dish name
  const [recipe, setRecipe] = useState<any>(null);
  const [ingredients, setIngredients] = useState<any | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fetchRecipe = async () => {
    const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${dishName}&maxFat=25&number=2&apiKey=e7aa0f5b64d540b5bbaa34cfa522129f`);
    const data = await res.json();
    const recipeData = data.results[0]
    setRecipe(recipeData);
    fetchIngridients(recipeData.id);
  };

  const fetchIngridients = async (recipeId: number) => {
    const res = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.json?apiKey=e7aa0f5b64d540b5bbaa34cfa522129f`);
    const data = await res.json();
    console.log(data.ingredients);
    setIngredients(data.ingredients);
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const uploadedFile = data.file[0];
    console.log("Uploaded File:", uploadedFile);

    const formData = new FormData();
    formData.append("file", uploadedFile);

    // const res = await fetch("http://localhost:5000/predict", {
    //   method: "POST",
    //   body: formData,
    // });

    // const result = await res.text();
    // setResponse(result);

    fetchRecipe(); // Fetch the recipe when the form is submitted
    setIsSubmitted(true);
  };

  return (
    <div>
      <div className="px-24 py-4 border-2 border-dashed border-black-700">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-10">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Input File</FormLabel>
                    <FormControl>
                      <Input 
                        type="file" 
                        placeholder="shadcn" 
                        {...fileRef} 
                        onChange={(event) => {
                          field.onChange(event.target?.files?.[0] ?? undefined);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button type="submit" className="my-4">Submit</Button>
          </form>
        </Form>
      </div>
      <div className="mt-12">
        {isSubmitted && recipe && (
          <div className="mt-4 w-full">
            <Label className="text-4xl text-primary-forgeround">{recipe.title}</Label>
            <div className="mt-4">
              <Label className="text-xl text-primary-forgeround">Ingredients</Label>
              <ol>
                {ingredients && ingredients.map((ingredient: any, index: number) => (
                  <li key={index}>
                    <div>
                      <Label>{ingredient.name} - {ingredient.amount.metric.value} {ingredient.amount.metric.unit}</Label>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}