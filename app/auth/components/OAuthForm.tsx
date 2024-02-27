"use client";
import { Button } from "@/components/ui/button";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";

export default function Page() {
  const params = useSearchParams();
  const next = params.get("next");

  const handleLoginWithOAuth = (provider: "github" | "google") => {
    const supabase = supabaseBrowser();
    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: next
          ? `${location.origin}/auth/callback?next=${next}`
          : `${location.origin}/auth/callback`,
      },
    });
  };
  return (
    <div className="flex items-center justify-center ">
      <div className="w-full space-y-5">
        <Button
          className="flex w-full items-center gap-2"
          variant="outline"
          onClick={() => handleLoginWithOAuth("google")}
        >
          <FcGoogle />
          Google
        </Button>
        <Button
          className="flex w-full items-center gap-2"
          variant="outline"
          onClick={() => handleLoginWithOAuth("github")}
        >
          <ImGithub />
          Github
        </Button>
      </div>
    </div>
  );
}
