"use client";

import StarsRating from "../molecules/StarRating";
import { Lecture, Review, User } from "../type/type";
import Link from "next/link";
import DropMenu from "../molecules/DropMenu";
import SerchLecture from "../molecules/SerchLecture";
import { FC, useState } from "react";
import { LectureImage } from "../atoms/LectureImage";

type Props = {
  user: User | undefined;
  getLectures: Lecture[];
  getAllReview: Review[];
};

const Lectures: FC<Props> = ({ user, getLectures, getAllReview }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  {
    /* lectureIdごとにレビューをグループ化 */
  }
  const reviewsByLectureId = getAllReview?.reduce((acc, review) => {
    if (!review.lectureId) return acc; // lectureIdがないレビューは無視
    acc[review.lectureId] = acc[review.lectureId] || []; //同じlectureIdのレビューをグループ化
    acc[review.lectureId].push(review); //accでlectureIdをキーとしてリスト格納
    return acc;
  }, {} as { [key: string]: Review[] });

  {
    /* 講義名をフィルターにかける*/
  }
  const filteredLectures = searchKeyword
    ? getLectures.filter(
        (
          lecture //toLowerCaseで文字列を検索
        ) =>
          lecture.lecture_name
            .toLowerCase()
            .includes(searchKeyword.toLowerCase())
      )
    : getLectures; //searchKeywordのvalueが空ならすべての講義を表示

  return (
    <>
      <div className="flex flex-row justify-end items-center ">
        <div className="mr-3">
          <SerchLecture setSearchKeyword={setSearchKeyword} />
        </div>
        <DropMenu></DropMenu>
      </div>

      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-5 mx-auto">
        {filteredLectures.map((lecture) => (
          <Link
            key={lecture.id}
            href={
              user
                ? `${process.env.NEXT_PUBLIC_BASE_URL}/lecture/${lecture.id}`
                : "/api/auth/signin"
            }
            className="cursor-pointer duration-300 hover:translate-y-1 hover:shadow-none block"
          >
            <div className="w-[330px] h-[200px] justify-self-center relative bg-white shadow-md md:mb-5 mb-2">
              <div className="bg-[#FCA31C] absolute z-10 px-4">
                <p className="text-center text-white text-sm ">
                  {lecture.category}
                </p>
              </div>
              {/* 講義内容（時間、講師名） */}
              <div className="z-10 absolute text-sm flex flex-col w-full h-full justify-end ">
                <div className="flex justify-between mb-1">
                  <ul className="ml-5 text-sm my-2 mb-2">
                    <li>
                      <p className="mb-1">時間：{lecture.day_period}</p>
                      <p>講師名：{lecture.instructor_name}</p>
                    </li>
                  </ul>

                  <div className=" items-end mr-2 mt-8">
                    {/* <FaRegBookmark size={20} className="mb-3" /> */}
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
                <LectureImage lecture={lecture}></LectureImage>
              </div>
            </div>
          </Link>
        ))}
      </main>
    </>
  );
};

export default Lectures;

// const createBookMark = async (lectureId: string) => {
//   try {
//     const responce = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/bookmark`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: user?.id,
//           lectureId: lectureId,
//         }),
//       }
//     );
//     const bookMarkData = await responce.json();
//     console.log(bookMarkData, "お気に入り登録完了");
//   } catch (error) {
//     console.error("エラー:", error);
//   }
// };

{
  /* <button
                    className="bg-slate-400"
                    onClick={async (e) => {
                      e.preventDefault();
                      try {
                        await createBookMark(lecture.id);
                        alert("お気に入り登録完了");
                      } catch (error) {
                        console.log(error);
                        alert("お気に入り登録失敗");
                      }
                    }}
                  >
                    お気に入り登録
                  </button> */
}
