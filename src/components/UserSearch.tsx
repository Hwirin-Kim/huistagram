"use client";

import { ProfileUser } from "@/model/user";
import { FormEvent, useState } from "react";
import { FadeLoader } from "react-spinners";
import useSWR from "swr";
import UserCard from "./UserCard";

export default function UserSearch() {
  const [keyword, setKeyword] = useState("");
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<ProfileUser[]>(`/api/search/${keyword}`);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="w-full max-w-2xl my-4 flex flex-col items-center">
      <form onSubmit={onSubmit} className="w-full mb-4">
        <input
          className="w-full text-xl p-3 outline-none border border-gray-300"
          type="text"
          autoFocus
          placeholder="Search for a username or name"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      {error && <p>에러가 발생 하였습니다.</p>}
      {isLoading && <FadeLoader color="red" />}
      {!isLoading && !error && users?.length === 0 && (
        <p>해당 사용자가 없습니다.</p>
      )}
      <ul className="w-full p-4">
        {users &&
          users.map((user) => (
            <li key={user.username}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
}
