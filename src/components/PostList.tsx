"use client";
import usePosts from "@/hooks/usePosts";

import { FadeLoader } from "react-spinners";

import PostListCard from "./PostListCard";

export default function PostList() {
  const { posts, isLoading } = usePosts();
  console.log(posts);
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
