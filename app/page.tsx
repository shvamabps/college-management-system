"use client";

import Dashboard from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useConvexAuth, useMutation } from "convex/react";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUser();

  const { isLoading } = useConvexAuth();

  const registerUser = useMutation(api.users.createUser);

  useEffect(() => {
    if (user) {
      registerUser();
    }
  }, [user]);

  if (isLoading)
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-teal-500 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-teal-500 rounded-full animate-bounce delay-150"></div>
          <div className="w-4 h-4 bg-teal-500 rounded-full animate-bounce delay-300"></div>
        </div>
      </div>
    );

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-background to-secondary">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Welcome to CMS</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">Please sign in to access the dashboard.</p>
            <SignInButton mode="modal">
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <Dashboard />;
}
