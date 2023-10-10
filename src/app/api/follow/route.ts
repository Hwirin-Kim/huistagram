import { withSessionUser } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";
import { follow, unFollow } from "@/service/user";

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id: targetId, follow: isFollow } = await req.json();

    if (!targetId || isFollow === undefined) {
      return new Response("Bad Request Error", { status: 400 });
    }

    //isFollow가 true (follow요청을 보내면) follow
    const request = isFollow ? follow : unFollow;

    return request(user.id, targetId)
      .then((res) => NextResponse.json(res))
      .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
  });
}
