"use client";

import { useState } from "react";
import useSWR from "swr";

export default function UserSearch() {
  const [keyword, setKeyword] = useState("bob");
  const { data, isLoading, error } = useSWR(`/api/search/${keyword}`);
  return <div></div>;
}
