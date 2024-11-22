"use client";

import { Review, User } from "../type/type";
import Image from "next/image";
import StarsRating from "../molecules/StarRating";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Loading from "../atoms/loading";
import { FaTrash } from "react-icons/fa";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function MyPage() {
  const { data: session } = useSession();
  const user = session?.user as User | undefined;
  const userId = user?.id ? String(user.id) : null;

  {
    /* ユーザーのレビュー取得*/
  }
  const {
    data: userReviews,
    error,
    mutate,
  } = useSWR<Review[]>(
    userId ? `${process.env.NEXT_PUBLIC_API_URL}/review/${userId}` : null,
    fetcher
  );

  {
    /* ユーザーのレビュー削除*/
  }
  const deleteReview = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/review/delete`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        }
      );

      if (response.ok) {
        mutate(); // useSWRのキャッシュを更新
      } else {
        console.log("レビューの削除に失敗しました。", await response.json());
      }
    } catch (error) {
      console.log("エラーが発生しました。", error);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!userReviews) {
    //ユーザーのレビューがない場合はローディング
    return <Loading></Loading>;
  }

  return (
    <div>
      <div className="container mx-auto">
        <div className="md:w-4/5 w-5/6 bg-white shadow-md m-auto mb-14 mt-10 flex flex-col">
          <div className="mx-auto">
            <h3 className="text-lg md:text-2xl font-bold mt-14 mb-6">
              マイページ
            </h3>
          </div>
          <div className="mx-auto">
            <Image
              src={user?.image || "/default_icon.png"}
              alt="userIcon"
              width={120}
              height={120}
              className="rounded-full"
            ></Image>
          </div>
          <div className="mx-auto flex flex-col">
            <div className="flex mt-6 items-center ">
              <p className="mr-6 text-[#909090] text-[10px] mdtext-[14px] w-14 ">
                名前
              </p>
              <p className="text-[12px] md:text-[18px]font-semibold ">
                {user?.name}
              </p>
            </div>
            <div className="flex mt-3 items-center">
              <p className="mr-6 text-[#909090] text-[10px] mdtext-[14px] w-14 ">
                メール
              </p>
              <p className="text-[12px] md:text-[18px] font-semibold ">
                {user?.email}
              </p>
            </div>
          </div>
          <ul className="list-reset flex md:ml-[80px] ml-4 mt-7">
            <li className="mb-px mr-1 ">
              <a
                className="bg-[#FFC62A] text-white inline-block border-l border-t border-r rounded-t-md py-2 px-4 text-blue-dark font-semibold"
                href="#"
              >
                レビュー
              </a>
            </li>
            {/* <li className="mr-1">
              <a
                className="bg-white inline-block py-2 px-4 text-blue hover:text-blue-darker font-semibold"
                href="#"
              >
                お気に入り
              </a>
            </li> */}
          </ul>
          {userReviews && userReviews.length > 0 ? (
            <div className="mb-8">
              {userReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-[#F3F3F3] mx-auto w-[250px] md:w-[770px] mt-5 rounded-md border border-[#D3CECE] min-h-[85px] flex mb-3"
                >
                  <div className="flex justify-between items-start flex-col w-full my-4 md:ml-3 ml-2 ">
                    <div className="flex flex-col">
                      <p className="mb-1 text-sm font-semibold">
                        {review.lecture_name}
                      </p>
                      <StarsRating reviews={review} size={20}></StarsRating>
                    </div>

                    <div className="flex-1 max-w-[350px] md:max-w-[680px] md:mt-5 mt-3">
                      <p className="text-[7px] md:text-[10px] text-left break-words">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-end min-w-[0px]  ">
                    <div className="mr-8">
                      <FaTrash
                        className="md:h-[20px] md:w-[20px] mb-10 md:0"
                        size={10}
                        onClick={async (e) => {
                          e.preventDefault();
                          try {
                            await deleteReview(review.id);
                            alert("レビューを削除しました");
                          } catch {
                            alert("レビュー削除失敗しました");
                          }
                        }}
                      ></FaTrash>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className=" flex md:ml-[80px] ml-4 my-9">
              <p className="md:text-lg text-[12px]">
                レビューを投稿してください
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-screen fixed top-0 left-0 z-[-1] bg-[#909090] bg-opacity-30 object-cover"></div>
    </div>
  );
}

// if (user) {
//   try {
//     const userId = String(user.id);
//     const responce = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/review/${userId}`,
//       { cache: "no-store" } //HTTPリクエストにキャッシュを使わず最新のデータを常に取得
//     );
//     userReivews = await responce.json();
//   } catch (error) {
//     console.error("レビュー情報がありません", error);

// const  deleteReview = async() => {
//   try{
//     const responce = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review/delete`,
//       {
//         method:"DELETE",
//         headers:{"Content-Type":"application"},
//         body:JSON.stringify({
//           id
//         })
//       }
//     )

//   }catch{

//   }
// }
