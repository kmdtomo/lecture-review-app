import DropMenu from "@/app/molecules/DropMenu";
import StarsRating from "@/app/molecules/StarRating";
import { nextAuthOptions } from "@/app/lib/next-auth/option";
import { Lecture, Review } from "@/app/type/type";
import { getServerSession } from "next-auth";

import Link from "next/link";

import { LectureImage } from "@/app/atoms/LectureImage";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  let categoryLecture: Lecture[] = [];
  const session = await getServerSession(nextAuthOptions);
  const user = await session?.user;
  try {
    const responce = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/category/${category}`,
      { cache: "no-cache" }
    );
    if (!responce.ok) {
      console.error({ message: "データが取れませんでした" });
    }
    categoryLecture = await responce.json();
  } catch (error) {
    console.error(error, { message: "エラー" });
  }

  const getAllReviews = async (): Promise<Review[] | null> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/review/rating`,
        { cache: "no-store" }
      );

      const allReviews = await res.json();
      return allReviews;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const allReviews = await getAllReviews();

  // lectureIdごとにレビューをグループ化
  const reviewsByLectureId = allReviews?.reduce((acc, review) => {
    if (!review.lectureId) return acc; // lectureIdがないレビューは無視
    acc[review.lectureId] = acc[review.lectureId] || [];
    acc[review.lectureId].push(review);
    return acc;
  }, {} as { [key: string]: Review[] });

  return (
    <>
      <div className="mx-auto">
        <div className="flex flex-row justify-end items-center mr-5 md:mr-0">
          <div className="mr-3"></div>
          <DropMenu />
        </div>

        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-5 justify-items-center">
          {categoryLecture.map((lecture) => (
            <Link
              key={lecture.id}
              href={
                user
                  ? `${process.env.NEXT_PUBLIC_BASE_URL}/lecture/${lecture.id}`
                  : "/api/auth/signin"
              }
              className="cursor-pointer duration-300 hover:translate-y-1 hover:shadow-none block"
            >
              <div className="md:w-[330px] md:h-[210px] w-[300px] h-[180px] relative bg-white shadow-md md:mb-5 mb-3">
                {/* カテゴリ */}
                <div className="bg-[#FCA31C] px-4 absolute top-0 left-0 z-10 py-1">
                  <p className="text-center  text-white text-sm">
                    {lecture.category}
                  </p>
                </div>

                {/* 講義画像 */}
                <div className="relative w-full h-[100px] md:h-[120px] overflow-hidden bg-black/10">
                  <LectureImage lecture={lecture} />
                  {/* 講義名 */}
                  <h3 className="absolute text-lg md:text-xl text-white text-shadow-md top-1/2 left-5 transform -translate-y-1/2 z-10">
                    {lecture.lecture_name}
                  </h3>
                </div>

                {/* テキストエリア */}
                <div className="z-10 flex flex-col  justify-between pt-4">
                  {/* 詳細情報 */}
                  <ul className="text-xs md:text-sm  pl-4 ">
                    <li>
                      <p className="mb-1">時間：{lecture.day_period}</p>
                      <p>講師名：{lecture.instructor_name}</p>
                    </li>
                  </ul>

                  {/* 評価 */}
                  <div className="flex items-center justify-end mb-6 mr-2 z-20">
                    <StarsRating
                      reviews={reviewsByLectureId?.[lecture.id]}
                      size={20}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </main>
      </div>
    </>
  );
}
