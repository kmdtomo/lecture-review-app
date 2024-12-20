"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className=" text-gray-100 ">
      <nav className="flex items-center justify-between p-4">
        <Link href={"/"} className="md:ml-3">
          <Image
            width={100}
            height={20}
            alt="logo"
            className="md:w-[200px] md:h-[60px]"
            src={"/Lecrure review logo.png"}
          ></Image>
        </Link>
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="text-black hover:text-[#FCA31C] px-1 md:px-6 py-2 rounded-md text-[8px] md:text-sm font-medium"
          >
            ホーム
          </Link>
          <Link
            href="/lectureList"
            className="text-black hover:text-[#FCA31C] px-1 md:px-6 py-2 rounded-md text-[8px] md:text-sm font-medium"
          >
            講義一覧
          </Link>

          <Link
            href={user ? "/mypage" : "/api/auth/signin"}
            className="text-black hover:text-[#FCA31C] px-1 md:px-6 py-2 rounded-md text-[8px] md:text-sm font-medium"
          >
            マイページ
          </Link>
          {user ? (
            <Link
              href="/api/auth/signout"
              className="text-white hover:opacity-75 px-2 md:px-6  md:mr-10 mr-2 py-2  rounded-md text-[8px] md:text-sm font-medium bg-[#0BA595] "
            >
              ログアウト
            </Link>
          ) : (
            <Link
              href="/api/auth/signin"
              className="text-white hover:text-white px-2 md:px-6  md:mr-10 mr-2 py-2  rounded-md text-[7px] md:text-sm font-medium bg-[#0BA595]"
            >
              ログイン
            </Link>
          )}

          <Link href={`/mypage`}>
            <Image
              className="rounded-full mr-2 md:mr-10 md:w-[50px] md:h-[50px]"
              width={30}
              height={30}
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
