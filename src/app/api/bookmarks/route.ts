import { authOptions } from "./../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { addBookmark, removeBookmark } from "@/service/user";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  //body 안에서 id,bookmark 정보 가져오기
  const { id, bookmark } = await req.json();

  //id가 없거나 bookmark 정의되지 않은 경우
  if (!id || bookmark === undefined) {
    return new Response("Bad Request Error", { status: 400 });
  }

  const request = bookmark ? addBookmark : removeBookmark;

  //id === postId, user.id === userId
  return request(user.id, id)
    .then((res) => NextResponse.json(res))
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
