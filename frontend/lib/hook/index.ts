import { supabaseBrowser } from "../supabase/browser";
import { useQuery } from "@tanstack/react-query";
import { sortObject } from "../utils";

export function useGetVote(id: string) {
  const supabase = supabaseBrowser();

  return useQuery({
    queryKey: ["vote-" + id],
    queryFn: async () => {
      const { data } = await supabase
        .from("vote")
        .select("*,vote_options(*),vote_log(*)")
        .eq("id", id)
        .single();

      const voteOptions = sortObject(
        data?.vote_options?.options as { [key: string]: number }
      );

      const totalVote = Object.values(voteOptions).reduce((a, b) => a + b, 0);

      return {
        voteOptions,
        totalVote,
        voteLog: data?.vote_log[0],
        isExpired: data?.end_date! < new Date().toISOString(),
      };
    },
    staleTime: Infinity,
  });
}
