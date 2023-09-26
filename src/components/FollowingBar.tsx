import React from "react";
import useSWR from "swr";
export default function FollowingBar() {
  const { data, error, isLoading } = useSWR("경로입력");
  return <div>followingbar</div>;
}
