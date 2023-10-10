import { withSessionUser } from "@/util/session";
import { authOptions } from "./../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { dislikePost, likePost } from "@/service/posts";

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    //body 안에서 id,like 정보 가져오기
    const { id, like } = await req.json();

    //id가 없거나 like가 정의되지 않은 경우
    if (!id || like === undefined) {
      return new Response("Bad Request Error", { status: 400 });
    }

    const request = like ? likePost : dislikePost;

    //id === postId, user.id === userId
    return request(id, user.id)
      .then((res) => NextResponse.json(res))
      .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
  });
}
