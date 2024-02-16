"user client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { RiEdit2Fill } from "react-icons/ri";
import { BsTrash } from "react-icons/bs";

export default function VoteWrapper({ id }: { id: string }) {
  return (
    <div>
      <div>
        <Link href={`/vote/${id}/edit`}>
          <Button variant="outline">
            <RiEdit2Fill />
          </Button>
        </Link>
        <Link href={`/vote/${id}/delete`}>
          <Button variant="outline">
            <BsTrash />
          </Button>
        </Link>
      </div>
    </div>
  );
}
