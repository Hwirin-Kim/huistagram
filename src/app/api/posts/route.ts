import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getFollowingPostsOf } from "@/service/posts";
import { getUserByUsername } from "@/service/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication failed", { status: 401 });
  }

  return getFollowingPostsOf(user.username).then((data) =>
    NextResponse.json(data)
  );
}
