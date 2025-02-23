"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const formSchema = z.object({
  toDo: z.string().min(4).max(50),
  isCompleted: z.boolean().default(false),
});
type toDo = {
  toDo: string;
  isCompleted: boolean;
};
type getTodoProps = {
  getTodo: (todo: toDo) => void;
};
export function TodoForm({ getTodo }: getTodoProps) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      toDo: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    getTodo(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="toDo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add a Todo</FormLabel>
              <FormControl>
                <Input
                  placeholder="Start adding todos"
                  {...field}
                  className="w-full px-4 py-2 text-gray-800 placeholder-gray-500 bg-white border border-gray-300  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-pink-500 text-white font-medium px-4 py-2 rounded-md shadow hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300 "
        >
          ADD
        </Button>
      </form>
    </Form>
  );
}
