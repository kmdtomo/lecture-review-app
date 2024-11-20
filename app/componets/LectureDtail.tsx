"use client";

import { LectureImage } from "@/app/atoms/LectureImage";
import Loading from "@/app/atoms/loading";
import StarsRating from "@/app/molecules/StarRating";
import { Lecture, Review } from "@/app/type/type";
import Image from "next/image";
import Link from "next/link";

import { ChangeEvent, useState, FC } from "react";
import useSWR from "swr";

type Props = {
  lecture: Lecture;
  userId?: string;
  lectureId: string;
  // params: { lectureId: string };
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const LectureDetail: FC<Props> = ({ lecture, userId, lectureId }) => {
  const [comments, setComments] = useState<string>("");
  const [atmosphereRating, setAtmosphereRating] = useState<number>(0);
  const [futureRating, setFutureRating] = useState<number>(0);
  const [easinessRating, setEasinessRating] = useState<number>(0);

  {
    /* lectureIdからreview取得*/
  }
  const {
    data: reviews,
    error: reviewsError,
    mutate: mutateReview,
  } = useSWR<Review[]>(
    lectureId
      ? `${process.env.NEXT_PUBLIC_API_URL}/lecture/${lectureId}/review`
      : null,
    fetcher
  );

  {
    /*useSWRのnullチェック*/
  }
  if (reviewsError) return <p>レビューの読み込み中にエラーが発生しました</p>;
  if (!reviews) return <Loading />;

  {
    /* review投稿*/
  }
  const createReview = async () => {
    try {
      const responce = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/review`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId,
            lectureId: lectureId,
            atmosphereRating: atmosphereRating,
            futureRating: futureRating,
            easinessRating: easinessRating,
            comment: comments,
          }),
        }
      );

      if (!responce.ok) {
        console.error("エラーです");
      }
      const reviewData = await responce.json();
      mutateReview((prevReviews: Review[] | undefined) => {
        if (prevReviews && Array.isArray(prevReviews)) {
          return [...prevReviews, reviewData]; // 既存のレビューがあれば追加
        } else {
          return [reviewData]; // まだレビューがなければ新規作成
        }
      }, false); // falseを指定してローカルでのみ更新

      // ここで状態変数をリセット
      setComments("");
      setAtmosphereRating(0);
      setFutureRating(0);
      setEasinessRating(0);
      return reviewData;
    } catch (err) {
      return console.log(err);
    }
  };

  {
    //雰囲気レート保存
    const handleChangeAtmosphereRating = (newRating: number) => {
      setAtmosphereRating(newRating);
    };
    //単位取得さレート保存
    const handleChangeFutureRating = (newRating: number) => {
      setFutureRating(newRating);
    };
    //将来性レート保存
    const handleChangeEasinessRating = (newRating: number) => {
      setEasinessRating(newRating);
    };
    //口コミコメント保存
    const onChangeInputComments = (e: ChangeEvent<HTMLTextAreaElement>) =>
      setComments(e.target.value);

    return (
      <div>
        <div className="container mx-auto">
          {/* カテゴリーごとの画像配置 */}
          <div className="m-auto mt-10 w-4/5 pb-10 mb-10 relative border bg-white shadow-md">
            <div className="relativ absolute bg-white top-0 left-0 w-full h-[170px] md:h-[200px] overflow-hidden bg-black/10 mb-0 ">
              <h3 className="text-white z-10 text-3xl absolute top-1/2 ml-10 text-shadow-md">
                {lecture?.lecture_name}
              </h3>
              <LectureImage lecture={lecture}></LectureImage>
            </div>
            {/* 詳細テーブル */}
            <div className="relative z-20 mx-auto  mt-[200px] md:mt-[240px]  w-full max-w-3xl">
              <table className=" table-auto mx-auto w-5/6 md:w-full">
                <tbody>
                  <tr>
                    <th className="font-normal bg-[#0BA595] text-white border-2 border-gray-400 px-10 py-2 text-center text-sm md:text-base whitespace-nowrap">
                      講師名
                    </th>
                    <td className="border-2 border-gray-400 pl-3 md:pl-7 py-2 text-left text-[12px] md:text-base">
                      {lecture?.instructor_name}
                    </td>
                  </tr>
                  <tr>
                    <th className="font-normal bg-[#0BA595] text-white border-2 border-gray-400 px-10 py-2 text-center text-sm md:text-base whitespace-nowrap">
                      時間
                    </th>
                    <td className="border-2 border-gray-400 pl-3 md:pl-7 py-2 text-left text-[12px] md:text-base">
                      {lecture?.day_period}
                    </td>
                  </tr>
                  <tr>
                    <th className="font-normal bg-[#0BA595] text-white border-2 border-gray-400 px-10 py-2 text-center text-sm md:text-base whitespace-nowrap">
                      コース
                    </th>
                    <td className="border-2 border-gray-400 pl-3 md:pl-7 py-2 text-left text-[12px] md:text-base">
                      {lecture?.category}
                    </td>
                  </tr>
                  <tr>
                    <th className="font-normal bg-[#0BA595] text-white border-2 border-gray-400 px-10 py-2 text-center text-sm md:text-base whitespace-nowrap">
                      評価方法
                    </th>
                    <td className="border-2 border-gray-400 pl-3 md:pl-7 py-2 text-left text-[12px] md:text-base">
                      {lecture?.evaluation}
                    </td>
                  </tr>
                  <tr>
                    <th className="font-normal bg-[#0BA595] text-white border-2 border-gray-400 px-10 py-2 text-center text-sm md:text-base whitespace-nowrap">
                      達成目標
                    </th>
                    <td className="border-2 border-gray-400 pl-3 md:pl-7 py-2 text-left text-[12px] md:text-base">
                      {lecture?.objective}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/*レビュー機能、口コミ機能 */}

            <div className=" flex flex-col md:flex-row justify-between items-start mx-auto md:w-3/4 w-2/3 mt-12 ">
              <div className=" flex flex-col">
                <h3 className="text-xl font-semibold mb-5">評価する</h3>
                <div className="">
                  <div className="flex justify-between items-start mb-3">
                    <p className=" pr-4 text-lg font-semibold text-[#0BA595] ">
                      雰囲気
                    </p>
                    <StarsRating
                      size={30}
                      onClick={handleChangeAtmosphereRating}
                      rating={atmosphereRating}
                    ></StarsRating>
                  </div>
                  <div className="flex justify-between items-start mb-3">
                    <p className=" pr-4 text-lg font-semibold text-[#0BA595]">
                      単位取得やすさ
                    </p>
                    <StarsRating
                      size={30}
                      onClick={handleChangeFutureRating}
                      rating={futureRating}
                    ></StarsRating>
                  </div>
                  <div className="flex justify-between items-start">
                    <p className=" pr-4 text-lg font-semibold text-[#0BA595]">
                      将来性
                    </p>
                    <StarsRating
                      size={30}
                      onClick={handleChangeEasinessRating}
                      rating={easinessRating}
                    ></StarsRating>
                  </div>
                </div>
              </div>
              <div className="md:ml-16">
                <h3 className="text-xl font-semibold mb-5 mt-5 md:mt-0">
                  口コミを書く
                </h3>
                <textarea
                  value={comments}
                  onChange={onChangeInputComments}
                  className="border border-black w-[350px] min-h-[100px]"
                  placeholder="講義について具体的な口コミを書いてください、また特定の教授についての悪口等は書き込まないでください"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-center mx-auto pt-5">
              {lecture ? (
                <Link
                  href={"/"}
                  onClick={async (e) => {
                    e.preventDefault();
                    if (
                      !comments ||
                      !atmosphereRating ||
                      !futureRating ||
                      !easinessRating
                    ) {
                      alert("レビューを入力してください");
                      return;
                    }
                    try {
                      await createReview();
                      alert("レビューが送信されました");
                    } catch {
                      alert("レビューが送信できませんでした");
                    }
                  }}
                  className="bg-[#0BA595] text-white px-5 py-2 rounded-lg "
                >
                  投稿する
                </Link>
              ) : (
                ""
              )}
            </div>
            {/*レビュー一覧 */}
            {reviews && reviews.length > 0 ? (
              <div className="relative z-20 mx-auto w-full mt-10 ">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-[#F3F3F3] mx-auto w-full max-w-[420px] md:max-w-[770px] mt-5 rounded-md border border-[#D3CECE] min-h-[85px] flex mb-3"
                  >
                    <div className="flex justify-start items-start flex-col w-full mx-6 my-4  md:mx-6 ">
                      <div className="ml-1 flex flex-row items-center ">
                        <Image
                          className="rounded-full"
                          alt="userImage"
                          width={42}
                          height={42}
                          src={review.user?.image || "/default_icon.png"}
                        ></Image>

                        <div className="ml-2 font-semibold">
                          <p>{review.user?.name}</p>
                        </div>

                        <div className="ml-3">
                          <StarsRating reviews={review} size={20}></StarsRating>
                        </div>
                      </div>

                      <div className="ml-2 md:ml-1 flex-1 max-w-[85%] md:max-w-[90%] mt-5 ">
                        <p className="text-[9px] md:text-[10px] text-left break-words">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex w-full justify-center mx-auto mt-14">
                <p>レビューはありません</p>
              </div>
            )}
          </div>
        </div>
        {/*背景固定、背景色*/}
        <div className="w-full h-screen fixed top-0 left-0 z-[-1] bg-[#909090] bg-opacity-30 object-cover  "></div>
      </div>
    );
  }
};

export default LectureDetail;
