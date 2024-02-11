"use client";
import React from "react";
import useUser from "@/app/auth/hook/useUser";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const { data, isFetching } = useUser();

  if (isFetching) {
    return <div></div>;
  }

  return (
    <div>
      {!data?.id ? (
        <div>
          <Link href="/auth">SignIn</Link>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="rounded-md border p-5 space-y-5">
            <div className="w-96 flex justify-around items-center">
              <Image
                src={data?.avatar || ""}
                alt={data?.username || ""}
                width={50}
                height={50}
                className="rounded-full animate-fade ring-2"
              />
              <div>
                <div>
                  <p>{data?.username}</p>
                </div>
                <div>
                  <p>{data?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
