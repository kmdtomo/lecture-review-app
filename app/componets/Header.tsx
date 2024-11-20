"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { data: session } = useSession();
  const user = session?.user;
  console.log(user?.id);

  return (
    <header className=" text-gray-100 ">
      <nav className="flex items-center justify-between p-4">
        <Link href={"/"} className="md:ml-3">
          <Image
            width={200}
            height={20}
            alt="logo"
            src={"/Lecrure review logo.png"}
          ></Image>
        </Link>
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="text-black hover:text-[#FCA31C] px-3 md:px-6 py-2 rounded-md text-sm font-medium"
          >
            ホーム
          </Link>
          <Link
            href="/lectureList"
            className="text-black hover:text-[#FCA31C] px-3 md:px-6 py-2 rounded-md text-sm font-medium"
          >
            講義一覧
          </Link>

          <Link
            href={user ? "/mypage" : "/api/auth/signin"}
            className="text-black hover:text-[#FCA31C] px-3 md:px-6 py-2 rounded-md text-sm font-medium"
          >
            マイページ
          </Link>
          {user ? (
            <Link
              href="/api/auth/signout"
              className="text-white hover:opacity-75 px-3 md:px-6  md:mr-10 mr-3 py-2  rounded-md text-sm font-medium bg-[#0BA595] "
            >
              ログアウト
            </Link>
          ) : (
            <Link
              href="/api/auth/signin"
              className="text-white hover:text-white px-3 md:px-6  md:mr-10 mr-3 py-2  rounded-md text-sm font-medium bg-[#0BA595]"
            >
              ログイン
            </Link>
          )}

          <Link href={`/mypage`}>
            <Image
              className="rounded-full mr-2 md:mr-10"
              width={50}
              height={50}
              alt="profile_icon"
              src={user?.image || "/default_icon.png"}
            />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
