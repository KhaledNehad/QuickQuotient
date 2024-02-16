import { supabaseBrowser } from "@/lib/supabase/browser";
import Image from "next/image";
import Link from "next/link";
import { RiEdit2Fill } from "react-icons/ri";
import { BsTrash } from "react-icons/bs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = supabaseBrowser();

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", params.id)
    .single();
  if (error) {
    console.error(error);
    return <div>error</div>;
  }
  if (!user) {
    return <div>loading...</div>;
  }

  const { data: votes, error: votesError } = await supabase
    .from("vote")
    .select("*")
    .eq("created_by", user.id);
  if (votesError) {
    console.error(votesError);
    return <div>error</div>;
  }

  return (
    <div>
      <Image
        src={user.avatar || "/default-avatar.png"}
        alt={user.username + " avatar"}
        priority
        width={100}
        height={100}
      />
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
        {user.username}
      </h1>
      <div className="scroll-m-20 text-sm font-semibold tracking-tight text-gray-500">
        {user.email}
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>End At</TableHead>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {votes.map((vote) => (
              <TableRow key={vote.id}>
                <TableCell>{vote.title}</TableCell>
                <TableCell>
                  {new Date(vote.end_date) > new Date() ? "Active" : "Expired"}
                </TableCell>
                <TableCell>
                  {new Date(vote.created_at).toLocaleString("en-US")}
                </TableCell>
                <TableCell>
                  {new Date(vote.end_date).toLocaleString("en-US")}
                </TableCell>

                {vote.created_by === user.id && (
                  <>
                    {new Date(vote.end_date) > new Date() && (
                      <TableCell className="flex space-x-1  items-center text-blue-500 w-[60px]">
                        <Link href={`/vote/${vote.id}/edit`}>
                          <RiEdit2Fill />
                        </Link>
                      </TableCell>
                    )}

                    <TableCell className="flex space-x-1 text-red-500 items-center w-[60px]">
                      <Link href={`/vote/${vote.id}/delete`}>
                        <BsTrash aria-label="Delete vote" />
                      </Link>
                    </TableCell>
                  </>
                )}
                <TableCell>
                  <Link href={`/vote/${vote.id}`}>View</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
