"use client";

import React from "react";
import Image from "next/image";

export default function UserInfo({ user }: { user: any }) {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative w-16 h-16">
        <Image
          src={user.avatar}
          alt={user.username}
          width="64"
          height="64"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold">{user.username}</h1>
        <p className="text-gray-500">{user.email}</p>
      </div>
    </div>
  );
}
