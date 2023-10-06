import { SimplePost } from "@/model/post";
import useSWR from "swr";

async function updateLike(id: string, like: boolean) {
  return fetch("api/likes", {
    method: "PUT",
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
}

export default function usePosts() {
  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>("/api/posts");

  const setLike = (post: SimplePost, username: string, like: boolean) => {
    //newPost는 optimistic업데이트를 하기 위한 새로운 post로, 기존 like상태에 따라 likes배열을 수정한 뒤 post에 업데이트 한다.
    const newPost = {
      ...post,
      likes: like
        ? [...post.likes, username]
        : post.likes.filter((item) => item !== username),
    };

    //newPosts는 optimistic 업데이트를 해줄 새로운 posts배열로, 현재 post를 newPost로 바꿔주고, 기존 post는 그대로 사용한다.
    const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

    //optimistic 업데이트를 적용시킴, mutate에 전달한 첫번째 fetch함수의 반환값으로 미리 UI를 업데이트 하고, 만약 에러발생시 롤백하도록 설정
    return mutate(updateLike(post.id, like), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };
  return { posts, isLoading, error, setLike };
}
