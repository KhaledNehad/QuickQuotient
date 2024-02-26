"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import OAuthForm from "./OAuthForm";
import { KeyRound } from "lucide-react";

export default function AuthForm() {
  return (
    <div className="w-full max-w-md">
      <div className="flex items-center gap-2 mb-6">
        <KeyRound />
        <h1 className="text-2xl font-bold">Quick Quotient</h1>
      </div>
      {/* <Tabs defaultValue="register" className="flex flex-col space-y-4">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="register">Register</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
      </Tabs> */}
      <div className="flex items-center justify-center space-x-2 mt-5">
        <hr className="w-1/4" />
        <span>Continue with</span>
        <hr className="w-1/4" />
      </div>

      <div className="mt-4">
        <OAuthForm />
      </div>
    </div>
  );
}
