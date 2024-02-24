export const dynamic = "force-dynamic";

import { supabaseBrowser } from "@/lib/supabase/browser";
import { redirect } from "next/navigation";
import VoteWrapper from "@/app/vote/components/VoteWrapper";
import VoteInfo from "../components/VoteInfo";

// export async function generateStaticParams() {
//   const supabase = await supabaseBrowser();
//   const { data: votes } = await supabase
//     .from("vote")
//     .select("id")
//     .filter("end_date", "gte", new Date().toISOString())
//     .limit(10);
//   return votes as any;
// }

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = await supabaseBrowser();

  const { data: vote, error: voteError } = await supabase
    .from("vote")
    .select("*")
    .eq("id", params.id)
    .single();

  if (voteError) {
    redirect("/404");
  }

  return (
    <>
      <VoteInfo
        title={vote?.title}
        endDate={vote.end_date}
        id={vote.id}
        createdAt={vote.created_at}
      />

      <VoteWrapper id={params.id} />
    </>
  );
}
