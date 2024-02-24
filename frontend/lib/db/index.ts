"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
import { Json } from "../types/supabase";
import { redirect } from "next/navigation";

export async function listActiveVotes() {
  const supabase = await createSupabaseServerClient();
  return supabase
    .from("vote")
    .select("*,users(*)")
    .filter("end_date", "gte", new Date().toISOString())
    .order("created_at", { ascending: true });
}

export async function listExpiredVotes() {
  const supabase = await createSupabaseServerClient();

  return supabase
    .from("vote")
    .select("*, users(*)")
    .filter("end_date", "lte", new Date().toISOString())
    .order("created_at", { ascending: true });
}

export async function createVote(data: {
  vote_options: Json;
  end_date: Date;
  title: string;
  description?: string;
}) {
  const supabase = await createSupabaseServerClient();

  const { data: voteId, error } = await supabase.rpc("create_vote", {
    options: data.vote_options,
    end_date: new Date(data.end_date).toISOString(),
    title: data.title,
    description: data.description || "",
  });

  if (error) {
    throw "Failed to create vote" + error.message;
  } else {
    return redirect("/vote/" + voteId);
  }
}
