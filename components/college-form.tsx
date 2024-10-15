"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { api } from "@/convex/_generated/api";
import { useToast } from "@/hooks/use-toast";
import { registerCollegeFormSchema } from "@/schemas";
import { useMutation } from "convex/react";

const CollegeForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof registerCollegeFormSchema>>({
    resolver: zodResolver(registerCollegeFormSchema),
    defaultValues: {
      affiliatedWith: "",
      collegeGroupName: "",
      collegeName: "",
      collegeBoard: "",
      establishedYear: "",
    },
  });

  const registerCollege = useMutation(api.college.registerCollege);

  function onSubmit(values: z.infer<typeof registerCollegeFormSchema>) {
    registerCollege(values);

    form.reset();

    toast({
      title: "College Registered",
      description: "College has been registered successfully.",
      variant: "default",
    });
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#0A0A0A] p-4">
      <div className="bg-[#0A0A0A] bg-opacity-90 backdrop-blur-md rounded-lg shadow-md p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">
          College Registration Form
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            autoComplete="off"
          >
            <FormField
              control={form.control}
              name="collegeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">College Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter college name"
                      {...field}
                      className="border-gray-600 bg-gray-800 text-white placeholder-gray-400 rounded-md p-2 w-full"
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="collegeGroupName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    College Group Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter group name"
                      {...field}
                      className="border-gray-600 bg-gray-800 text-white placeholder-gray-400 rounded-md p-2 w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="establishedYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Established Year</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Year"
                      {...field}
                      className="border-gray-600 bg-gray-800 text-white placeholder-gray-400 rounded-md p-2 w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="affiliatedWith"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Affiliated With</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Affiliation"
                      {...field}
                      className="border-gray-600 bg-gray-800 text-white placeholder-gray-400 rounded-md p-2 w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="collegeBoard"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">College Board</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type of college board"
                      {...field}
                      className="border-gray-600 bg-gray-800 text-white placeholder-gray-400 rounded-md p-2 w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CollegeForm;
