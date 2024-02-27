import { useQueryClient } from "@tanstack/react-query";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useEffect, useMemo, useState } from "react";
import { redirect } from "next/navigation";
import { useGetVote } from "@/lib/hook";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { BsInfoCircleFill } from "react-icons/bs";
import { Button } from "@/components/ui/button";

export default function Vote({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const supabase = supabaseBrowser();
  const { data, isFetched } = useGetVote(id);

  useEffect(() => {
    if (!isFetched) return;
    if (!data) {
      redirect("/404");
    }
    const channel = supabase
      .channel(`vote${id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "vote_options",
          filter: "vote_id=eq." + id,
        },
        (payload) => {
          queryClient.setQueryData(["vote-" + id], (currentVote: any) => ({
            ...currentVote,
            voteOptions: payload.new.options,
          }));
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [data, isFetched, id, queryClient, supabase]);

  const totalVote = useMemo(() => {
    if (!data) return 0;
    return Object.values(data.voteOptions).reduce((a, b) => a + b, 0);
  }, [data]);

  const highestKey = useMemo(() => {
    if (!data) return "";

    return Object.keys(data.voteOptions).reduce(
      (a, b) => (data.voteOptions[a] > data.voteOptions[b] ? a : b),
      ""
    );
  }, [data]);

  if (isFetched && !data) {
    return <div>loading</div>;
  }
  if (!data) {
    return;
  }

  const { voteOptions, isExpired, voteLog } = data;

  const handleUpdateVote = async (option: string) => {
    let { error } = await supabase.rpc("update_vote_and_log", {
      update_id: id,
      option,
    });
    if (error) {
      throw "Fail to vote";
    } else {
      queryClient.invalidateQueries({ queryKey: ["vote-" + id] });
    }
  };

  const castVote = async (option: string) => {
    if (voteLog) {
      return toast.error("You have already voted");
    }
    if (isExpired) {
      return toast.error("This vote has expired");
    } else {
      toast.promise(handleUpdateVote(option), {
        loading: "Voting for " + option,
        success: "Vote successful for " + option,
        error: "Fail to vote for " + option,
      });
    }
  };

  return (
    <div className="space-y-10">
      <div>
        {Object.keys(voteOptions).map((key, index) => {
          const percentage = Math.round(
            (voteOptions[key as keyof typeof voteOptions] * 100) / totalVote!
          );
          return (
            <div
              key={index}
              className={cn("flex items-center gap-2", "p-2 rounded-md")}
            >
              <div className="flex-1">
                <h1 className="text-lg font-bold">
                  {key === highestKey && (
                    <span className="text-green-500">👑 </span>
                  )}
                  {key}
                </h1>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-1/2 h-4 bg-gray-300 rounded-md",
                      key === highestKey ? "bg-green-500" : "bg-gray-800"
                    )}
                    style={{ width: percentage + "%" }}
                  ></div>
                  <h1>{percentage}%</h1>
                </div>
              </div>
              <Button
                onClick={() => castVote(key)}
                className="px-4 py-2"
                variant="outline"
              >
                Vote
              </Button>
            </div>
          );
        })}
      </div>
      {voteLog && (
        <div className="flex items-center gap-2 p-2 bg-gray-800 rounded-md">
          <BsInfoCircleFill />
          <h1 className="text-lg ">
            You have voted for{" "}
            <span className="text-yellow-500 font-bold">{voteLog.option}</span>{" "}
            on {new Date(voteLog?.created_at!).toDateString()}{" "}
            {new Date(voteLog?.created_at!).toLocaleTimeString()}
          </h1>
        </div>
      )}
    </div>
  );
}
