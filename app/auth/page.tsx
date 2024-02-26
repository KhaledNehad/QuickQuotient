import React from "react";
import AuthForm from "./components/AuthForm";

export default function page() {
  return (
    <div className="flex justify-center items-center">
      <div className="rounded-md border p-5 space-y-5">
        <div className="w-96">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
