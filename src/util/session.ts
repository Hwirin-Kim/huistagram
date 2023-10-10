import { getServerSession } from "next-auth";
import { AuthUser } from "@/model/user";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * route에서 반복적으로 사용하는 부분 모듈화 (유저검사 및 에러처리)
 * @param handler route에서 사용할 함수를 콜백으로 전달
 * @returns 콜백으로 받은 함수에 user를 전달하여 반환
 */
export async function withSessionUser(
  handler: (user: AuthUser) => Promise<Response>
): Promise<Response> {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  return handler(user);
}
