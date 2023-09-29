"use client";

import { DetailUser } from "@/model/user";
import Link from "next/link";
import React from "react";
import { SyncLoader } from "react-spinners";
import useSWR from "swr";
import Avatar from "./Avatar";
export default function FollowingBar() {
  const { data, error, isLoading } = useSWR<DetailUser>("/api/me");

  //   const users = data?.following;
  //   const users = undefined;
  const users = data?.following && [
    ...data.following,
    ...data.following,
    ...data.following,
    ...data.following,
    ...data.following,
  ];
  return (
    <section className="w-full flex justify-center items-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto">
      {isLoading ? (
        <SyncLoader size={8} color="red" />
      ) : (
        (!users || users.length === 0) && <p>{`You don't have following`}</p>
      )}
      {users && users.length > 0 && (
        <ul className="w-full flex gap-2 ">
          {users.map((user) => (
            <li key={user.username}>
              <Link
                className="flex flex-col items-center w-20"
                href={`/user/${user.username}`}
              >
                <Avatar image={user.image} highlight />
                <p className="w-full text-sm text-ellipsis overflow-hidden text-center">
                  {user.username}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
