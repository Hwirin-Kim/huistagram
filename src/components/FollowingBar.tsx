"use client";

import useMe from "@/hooks/useMe";
import { HomeUser } from "@/model/user";
import Link from "next/link";
import React from "react";
import { SyncLoader } from "react-spinners";
import useSWR from "swr";
import Avatar from "./Avatar";
import ScrollableBar from "./ui/ScrollableBar";
export default function FollowingBar() {
  const { user, error, isLoading } = useMe();

  const users = user?.following;
  return (
    <section className="w-full flex justify-center items-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto relative z-0">
      {isLoading ? (
        <SyncLoader size={8} color="red" />
      ) : (
        (!users || users.length === 0) && <p>{`You don't have following`}</p>
      )}
      {users && users.length > 0 && (
        <ScrollableBar>
          {users.map((user) => (
            <Link
              key={user.username}
              className="flex flex-col items-center w-20"
              href={`/user/${user.username}`}
            >
              <Avatar image={user.image} highlight />
              <p className="w-full text-sm text-ellipsis overflow-hidden text-center">
                {user.username}
              </p>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}
