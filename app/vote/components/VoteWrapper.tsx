"use client";

import React from "react";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { RiEdit2Fill } from "react-icons/ri";
import { BsTrash } from "react-icons/bs";
import { formatDistanceToNow } from "date-fns";

import useUser from "@/lib/hook/useUser";
import { supabaseBrowser } from "@/lib/supabase/browser";
import Vote from "./Vote";
import { redirect } from "next/navigation";
import VoteInfo from "./VoteInfo";

export default function VoteWrapper({ id }: { id: string }) {
  const { data, isFetching } = useUser();

  if (isFetching) {
    return <div></div>;
  }
  if (!data?.id) {
    redirect("/auth");
  }

  return (
    <div className="w-full ">
      <Vote id={id} />
    </div>
  );
}
