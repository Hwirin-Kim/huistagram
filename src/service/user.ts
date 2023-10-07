import { SearchUser } from "@/model/user";
import { idText } from "typescript";
import { client } from "./sanity";

type OAuthUser = {
  id: string;
  email: string;
  name: string;
  username: string;
  image?: string | null;
};
export async function addUser({ id, email, name, username, image }: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: "user",
    username,
    email,
    name,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  });
}

export async function getUserByUsername(username: string) {
  return client.fetch(
    `*[_type =="user"&&username=="${username}"][0]{
      ...,"id":_id, following[]->{username,image},followers[]->{username,image},"bookmarks":bookmarks[]->_id
    }`
  );
}

export async function searchUsers(keyword?: string) {
  //키워드는 이름이나 username 중 일치하면 검색되도록 정의한다.
  const query = keyword
    ? `&& (name match "*${keyword}") || (username match "*${keyword}")`
    : "";
  return client
    .fetch(
      `
    *[_type =="user" ${query}]{
      ...,
      "following":count(following),
      "followers":count(followers),
    }
    `
    )
    .then((users) =>
      users.map((user: SearchUser) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      }))
    );
}

export async function getUserForProfile(username: string) {
  return client
    .fetch(
      `*[_type=="user" && username == "${username}"][0]{
      ...,
      "id":_id,
      "following":count(following),
      "followers":count(followers),
      "posts": count(*[_type=="post"&&author->username=="${username}"])
    }
    `
    )
    .then((user) => ({
      ...user,
      following: user.following ?? 0,
      followers: user.followers ?? 0,
      posts: user.posts ?? 0,
    }));
}

export async function addBookmark(userId: string, postId: string) {
  client
    .patch(userId)
    .setIfMissing({ bookmarks: [] })
    .append("bookmarks", [
      {
        _ref: postId,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeBookmark(userId: string, postId: string) {
  client
    .patch(userId)
    .unset([`bookmarks[_ref=="${postId}"]`])
    .commit();
}
