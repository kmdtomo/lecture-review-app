import { getServerSession } from "next-auth";
import Lectures from "../componets/Lecture";
import { nextAuthOptions } from "../lib/next-auth/option";
import { supabase } from "../lib/supabase/supabaseClient";

{
  /* 講義一覧ページ */
}
export default async function LectureListPage() {
  const session = await getServerSession(nextAuthOptions);
  const user = await session?.user;

  //全ての講義内容をとってくる
  const { data: lectures, error } = await supabase
    .from("lecture")
    .select("*")
    .order("id");
  if (error) {
    console.error("講義取得エラー", error);
    return;
  }

  //全てのレビューをとってくる
  const AllReviews = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/review/rating`,
    { cache: "no-store" }
  );
  const reviews = await AllReviews.json();

  return (
    <>
      <Lectures
        getAllReview={reviews}
        getLectures={lectures}
        user={user}
      ></Lectures>
    </>
  );
}
