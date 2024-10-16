"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { GraduationCap } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { ConvexError } from "convex/values";
import { useRouter } from "next/navigation";

const CollegeForm = () => {
  const router = useRouter();
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
    registerCollege(values)
      .then(() => {
        form.reset();

        router.replace("/");

        toast({
          title: "College Registered",
          description: "College has been registered successfully.",
          variant: "default",
        });
      })
      .catch((error) => {
        if (error instanceof ConvexError) {
          return toast({
            title: "College Registration Failed",
            description: error.data as string,
            variant: "destructive",
          });
        }
        toast({
          title: "Something went wrong",
          description: error.message,
          variant: "destructive",
        });
      });
  }

  return (
    <div className="flex justify-center items-center h-[100%] p-4">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <GraduationCap className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            College Registration
          </CardTitle>
          <CardDescription className="text-center">
            Enter the details of the new college
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
              autoComplete="off"
            >
              <FormField
                control={form.control}
                name="collegeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>College Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter college name"
                        {...field}
                        className="bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="collegeGroupName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>College Group Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter group name"
                          {...field}
                          className="bg-background"
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
                      <FormLabel>Established Year</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Year"
                          {...field}
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="affiliatedWith"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Affiliated With</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Affiliation"
                        {...field}
                        className="bg-background"
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
                    <FormLabel>College Board</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type of college board"
                        {...field}
                        className="bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Register College
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollegeForm;
