import { searchUsers } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { keyword: string };
};
export async function GET(_: NextRequest, context: Context) {
  //로그인 하지 않아도 사용할수있도록 session정보 안가져옴
  return searchUsers(context.params.keyword).then((data) =>
    NextResponse.json(data)
  );
}
