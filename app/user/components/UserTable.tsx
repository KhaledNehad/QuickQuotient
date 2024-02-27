import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { BsTrash } from "react-icons/bs";
import { RiEdit2Fill } from "react-icons/ri";
import { IVotes } from "@/lib/types";
import Link from "next/link";

export default function UserTable({
  votes,
  userId,
}: {
  votes: any[];
  userId: string;
}) {
  return (
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

              {vote.created_by === userId ? (
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
              ) : (
                <>
                  <TableCell className="flex space-x-1  items-center w-[60px]"></TableCell>
                  <TableCell className="flex space-x-1  items-center w-[60px]"></TableCell>
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
  );
}
