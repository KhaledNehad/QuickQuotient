"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import useUser from "@/app/auth/hook/useUser";
import Image from "next/image";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { protectedPaths } from "@/lib/constant";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Profile() {
  const { data, isFetching } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  const pathname = usePathname();

  if (isFetching) {
    return <div></div>;
  }

  const handleSignOut = async () => {
    const supabase = supabaseBrowser();
    queryClient.clear();
    await supabase.auth.signOut();
    router.refresh();

    if (protectedPaths.includes(pathname)) {
      router.replace("/auth?next=" + pathname);
    }
  };

  return (
    <div>
      {!data?.id ? (
        <Link href="/auth" className="animate-fade">
          <Button variant="outline">Login</Button>
        </Link>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            {data.avatar ? (
              <Image
                src={data.avatar || ""}
                alt={data.username || ""}
                width={50}
                height={50}
                className="animate-fade ring-2"
                onClick={handleSignOut}
              />
            ) : (
              <div
                className="rounded-full w-[50px] text-2xl font-bold h-[50px] flex justify-center items-center ring-2 animate-fade"
                onClick={handleSignOut}
              >
                {data.email?.charAt(0)}
              </div>
            )}
            <DropdownMenuContent>
              <DropdownMenuLabel>{data.username}</DropdownMenuLabel>
              <Link href={`/user/${data.id}`}>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuTrigger>
        </DropdownMenu>
      )}
    </div>
  );
}
