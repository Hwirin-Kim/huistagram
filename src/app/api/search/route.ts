import { searchUsers } from "@/service/user";
import { NextResponse } from "next/server";

//해당 api는 요청이 올때마다 캐시된걸 사용하지 않고 새로 요청을 보내야 하므로 dynamic하게 설정
export const dynamic = "force-dynamic";
export async function GET() {
  //로그인 하지 않아도 사용할수있도록 session정보 안가져옴
  return searchUsers().then((data) => NextResponse.json(data));
}
