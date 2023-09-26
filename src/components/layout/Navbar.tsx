"use client";

import Link from "next/link";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

import { usePathname } from "next/navigation";
import {
  AddFillIcon,
  AddIcon,
  HomeFillIcon,
  HomeIcon,
  SearchFillIcon,
  SearchIcon,
} from "../ui/icons";
import ColorButton from "../ui/ColorButton";
import Avatar from "../Avatar";

const menu = [
  { path: "/", icon: <HomeIcon />, clickedIcon: <HomeFillIcon /> },
  { path: "/search", icon: <SearchIcon />, clickedIcon: <SearchFillIcon /> },
  { path: "/new", icon: <AddIcon />, clickedIcon: <AddFillIcon /> },
];

export default function Navbar() {
  const currentPath = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="flex justify-between items-center px-6">
      <Link href="/">
        <h1 className="text-3xl font-bold">Huistagram</h1>
      </Link>
      <nav className="">
        <ul className="flex items-center gap-4 text-2xl p-4">
          {menu.map(({ path, icon, clickedIcon }) => (
            <li key={path}>
              <Link href={path}>
                {path === currentPath ? clickedIcon : icon}
              </Link>
            </li>
          ))}
          {user && (
            <li>
              <Link href={`/user/${user.username}`}>
                <Avatar image={user.image} size="small" highlight={true} />
              </Link>
            </li>
          )}
          <li>
            {session ? (
              <ColorButton text="Sign out" onClick={() => signOut()} />
            ) : (
              <ColorButton text="Sign in" onClick={() => signIn()} />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
