import { SimplePost } from "@/model/post";
import { FadeLoader } from "react-spinners";
import useSWR from "swr";
import PostGridCard from "./PostGridCard";

type Props = {
  username: string;
  query: string;
};

export default function PostGrid({ username, query }: Props) {
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR<SimplePost[]>(`/api/users/${username}/${query}`);

  return (
    <div className="w-full text-center">
      {isLoading && (
        <div className="flex justify-center mt-20">
          <FadeLoader color="red" />
        </div>
      )}
      <ul className="grid grid-cols-3 gap-4 py-4 px-8">
        {posts &&
          posts.map((post, index) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          ))}
      </ul>
    </div>
  );
}
