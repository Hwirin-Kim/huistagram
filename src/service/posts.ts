import { SimplePost } from "@/model/post";
import { client, urlFor } from "./sanity";

const simplePostProjection = `...,"username":author->username,
"userImage":author->image,
"image":photo,
"likes":likes[]->username,
"text":comments[0].comment,
"comments":count(comments),
"id":_id,
"createdAt":_createdAt
`;

/**
 * username이 일치하는 post들과, 해당 user가 following하는 user들의 post도 가져오는 쿼리
 *
 */
export async function getFollowingPostsOf(username: string) {
  return client
    .fetch(
      `*[_type=="post"&&author->username =="${username}"
    || author._ref in *[_type=="user"&&username=="${username}"].following[]._ref
    ] | order(_createdAt desc){${simplePostProjection}}`
    )
    .then((posts) =>
      posts.map((post: SimplePost) => ({ ...post, image: urlFor(post.image) }))
    );
}
