"use client";

import { Button } from "@/components/ui/button";
import { formatDistanceToNow, format } from "date-fns";
import Link from "next/link";
import React from "react";
import { BsTrash } from "react-icons/bs";
import { RiEdit2Fill } from "react-icons/ri";
import useUser from "@/app/auth/hook/useUser";
import useGetSession from "@/app/auth/hook/useGetSession";
import Image from "next/image";

export default function VoteInfo({
  title,
  endDate,
  id,
  createdAt,
}: {
  title: string;
  endDate: string;
  id: string;
  createdAt: string;
}) {
  const { data: user, isFetching } = useUser();
  const { data } = useGetSession();

  if (isFetching) {
    return <div></div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
          {title}
        </h1>
        <div className="scroll-m-20 text-sm font-semibold tracking-tight ">
          {data?.session?.user.id === user?.id && (
            <div className="scroll-m-20 text-sm font-semibold tracking-tight ">
              <Button variant="outline" className="mr-2 text-gray-500">
                <Link href={`/vote/${id}/edit`}>
                  <RiEdit2Fill />
                </Link>
              </Button>
              <Button variant="outline" className="text-red-500">
                <Link href={`/vote/${id}/delete`}>
                  <BsTrash />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
      <h2 className="scroll-m-20 text-lg font-semibold tracking-tight flex items-center space-x-2">
        <span>Created by </span>
        <Link
          href={`/user/${user?.id}`}
          className="text-blue-500  hover:text-blue-600 focus:text-blue-600 flex items-center space-x-2"
        >
          <Image
            src={user?.avatar ?? ""}
            alt={user?.username ?? ""}
            width={20}
            height={20}
          />
          <span> {user?.username}</span>
        </Link>{" "}
        <span className="scroll-m-20 text-sm font-semibold tracking-tight text-gray-500">
          on {format(new Date(createdAt), "MMMM dd, yyyy - HH:mm")}
        </span>
      </h2>

      {endDate > new Date().toISOString() ? (
        <h3 className="scroll-m-20 text-sm font-semibold tracking-tight text-green-500">
          Ends {formatDistanceToNow(new Date(endDate), { addSuffix: true })}
        </h3>
      ) : (
        <h3 className="scroll-m-20 text-sm font-semibold tracking-tight text-red-500">
          Expired {formatDistanceToNow(new Date(endDate), { addSuffix: true })}
        </h3>
      )}
    </div>
  );
}
