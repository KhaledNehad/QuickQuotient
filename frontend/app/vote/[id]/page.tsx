import { supabaseBrowser } from "@/lib/supabase/browser";
import { redirect } from "next/navigation";
import { add, formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RiEdit2Fill } from "react-icons/ri";
import { BsTrash } from "react-icons/bs";

export default async function page({ params }: { params: { id: string } }) {
  const supabase = supabaseBrowser();

  const { data: vote, error } = await supabase
    .from("vote")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !vote) {
    redirect("/404");
  }

  const { data: userWhoPost } = await supabase
    .from("users")
    .select("*")
    .eq("id", vote.created_by)
    .single();

  const { data: options } = await supabase
    .from("options")
    .select("*")
    .eq("vote_id", vote.id)
    .single();

  const endDate = new Date(vote.end_date);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
          {vote.title}
        </h1>
        {userWhoPost && userWhoPost.id === params.id && (
          <div className="scroll-m-20 text-sm font-semibold tracking-tight ">
            <Button variant="outline" className="mr-2 text-gray-500">
              <Link href={`/vote/${vote.id}/edit`}>
                <RiEdit2Fill />
              </Link>
            </Button>
            <Button variant="outline" className="text-red-500">
              <Link href={`/vote/${vote.id}/delete`}>
                <BsTrash />
              </Link>
            </Button>
          </div>
        )}
      </div>

      <h2 className="scroll-m-20 text-lg font-semibold tracking-tight">
        Created by{" "}
        <Link
          href={`/user/${userWhoPost?.id}`}
          className="text-blue-500  hover:text-blue-600 focus:text-blue-600"
        >
          {userWhoPost?.username}
        </Link>
      </h2>

      <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
        {vote.description}
      </h2>
      <h3 className="scroll-m-20 text-sm font-semibold tracking-tight text-gray-500">
        Created{" "}
        {formatDistanceToNow(new Date(vote.created_at), { addSuffix: true })}
      </h3>
      {endDate > new Date() ? (
        <h3 className="scroll-m-20 text-sm font-semibold tracking-tight text-green-500">
          Ends in{" "}
          {formatDistanceToNow(new Date(vote.end_date), { addSuffix: true })}
        </h3>
      ) : (
        <h3 className="scroll-m-20 text-sm font-semibold tracking-tight text-red-500">
          Ended{" "}
          {formatDistanceToNow(new Date(vote.end_date), { addSuffix: true })}
        </h3>
      )}

      <div>
        <h2 className="scroll-m-20 text-lg font-semibold tracking-tight">
          Options
        </h2>
        <ul>
          {options &&
            options.options &&
            JSON.parse(options.options).map((option: any, index: number) => (
              <li key={index} className="scroll-m-20">
                {String(option)}
              </li>
            ))}
        </ul>

        {/* <h2 className="scroll-m-20 text-lg font-semibold tracking-tight">
          Voters
        </h2>
        <ul>
          {vote.voters.map((voter, index) => (
            <li key={index} className="scroll-m-20">
              {voter}
            </li>
          ))}
        </ul>

        <h2 className="scroll-m-20 text-lg font-semibold tracking-tight">
          Comments
        </h2>
        <ul>
          {vote.comments.map((comment, index) => (
            <li key={index} className="scroll-m-20">
              {comment}
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
}
