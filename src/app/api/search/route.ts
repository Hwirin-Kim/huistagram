import { searchUsers } from "@/service/user";
import { NextResponse } from "next/server";
export async function GET() {
  //로그인 하지 않아도 사용할수있도록 session정보 안가져옴
  return searchUsers().then((data) => NextResponse.json(data));
}
