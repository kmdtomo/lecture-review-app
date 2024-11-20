import DropMenu from "@/app/molecules/DropMenu";
import StarsRating from "@/app/molecules/StarRating";
import { nextAuthOptions } from "@/app/lib/next-auth/option";
import { Lecture, Review } from "@/app/type/type";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { FaRegBookmark } from "react-icons/fa";

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
      <DropMenu></DropMenu>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-5 mx-auto">
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
            <div className="w-[330px] h-[180px] justify-self-center relative bg-white shadow-md">
              <div className="bg-[#FCA31C] absolute z-10 px-4">
                <p className="text-center text-white text-sm ">
                  {lecture.category}
                </p>
              </div>
              {/* 講義内容（時間、講師名） */}
              <div className="z-10 absolute text-sm flex flex-col w-full h-full justify-end ">
                <div className="flex justify-between ">
                  <ul className="ml-5 text-sm mt-2">
                    <li>
                      <p className="mb-1">時間：{lecture.day_period}</p>
                      <p>講師名：{lecture.instructor_name}</p>
                    </li>
                  </ul>

                  <div className="flex flex-col items-end mr-2 mb-3">
                    <FaRegBookmark size={20} className="mb-3" />
                    <StarsRating
                      reviews={
                        reviewsByLectureId
                          ? reviewsByLectureId[lecture.id]
                          : undefined
                      }
                      size={20}
                    />
                  </div>
                </div>
              </div>

              {/* 講義名 */}
              <div className="absolute top-0 left-0 w-full h-3/5 overflow-hidden bg-black/10">
                <h3 className="z-10 text-xl text-white absolute text-shadow-md top-1/2 transform -translate-y-1/2 ml-5">
                  {lecture.lecture_name}
                </h3>

                {(() => {
                  // カテゴリーのログ
                  switch (lecture.category) {
                    case "RD":
                      return (
                        <Image
                          src="/RD.png"
                          alt="RD"
                          layout="fill"
                          objectFit="cover"
                        />
                      );
                    case "D1":
                      return (
                        <Image
                          src="/D1.png"
                          alt="D1"
                          layout="fill"
                          objectFit="cover"
                        />
                      );
                    case "D2":
                      return (
                        <Image
                          src="/D2.png"
                          alt="D2"
                          layout="fill"
                          objectFit="cover"
                        />
                      );
                    case "D3":
                      return (
                        <Image
                          src="/D3.png"
                          alt="D3"
                          layout="fill"
                          objectFit="cover"
                        />
                      );
                    case "D4":
                      return (
                        <Image
                          src="/D4.png"
                          alt="D4"
                          layout="fill"
                          objectFit="cover"
                        />
                      );
                    default:
                      return null;
                  }
                })()}
              </div>
            </div>
          </Link>
        ))}
      </main>
    </>
  );
}
