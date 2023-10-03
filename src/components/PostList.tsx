"use client";
import { SimplePost } from "@/model/post";
import { FadeLoader } from "react-spinners";
import useSWR from "swr";
import PostListCard from "./PostListCard";

export default function PostList() {
  const { data: posts, isLoading } = useSWR<SimplePost[]>("/api/posts");

  return (
    <section>
      {isLoading && (
        <div className="flex justify-center mt-40">
          <FadeLoader color="red" />
        </div>
      )}
      {posts && (
        <ul>
          {posts.map((post, index) => (
            <li className="mb-4" key={post.id}>
              <PostListCard post={post} priority={index < 1} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
