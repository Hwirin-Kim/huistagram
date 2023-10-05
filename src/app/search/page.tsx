import UserSearch from "@/components/UserSearch";
import { Metadata } from "next";
import React from "react";

//해당 페이지는 항상 dynamic하게 작동해야 하므로 추가
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Search",
  description: "사용자 검색",
};
export default function SearchPage() {
  return <UserSearch />;
}
