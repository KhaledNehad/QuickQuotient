"use client";
import { Button } from "@/components/ui/button";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";

export default function Page() {
  const params = useSearchParams();
  const next = params.get("next");

  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      "http://localhost:3000/";
    // Make sure to include `https://` when not localhost.
    url = url.includes("http") ? url : `https://${url}`;
    // Make sure to include a trailing `/`.
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
    return url;
  };

  const handleLoginWithOAuth = (provider: "github" | "google") => {
    const supabase = supabaseBrowser();
    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: next
          ? `${getURL()}auth/callback?next=${next}`
          : `${getURL()}auth/callback`,
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
