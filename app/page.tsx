import Image from "next/image";
import { Rammetto_One } from "next/font/google";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "./lib/next-auth/option";

const rammettoOne = Rammetto_One({ subsets: ["latin"], weight: ["400"] });

export default async function Home() {
  const session = await getServerSession(nextAuthOptions);
  const user = await session?.user;
  return (
    <div className="flex md:flex-row flex-col-reverse justify-around items-center md:mt-7 mt-14">
      <div className="md:ml-12">
        <Image
          src={"/main.png"}
          alt="main"
          width={350}
          height={600}
          className="rounded-md md:w-[500px] md:h-[600px]  h-auto"
        />
      </div>

      <div className="flex flex-col md:mb-14 mb-6 md:mr-7 ">
        <div>
          <h3 className="text-[#0BA595] font-semibold tracking-wider text-center text-lg md:text-2xl md:mb-8 mb-4">
            RD専用講義評価アプリ
          </h3>
        </div>
        <div className={rammettoOne.className}>
          <h1 className="text-center md:text-[135px] text-[70px] leading-none">
            <span className="block">LECTURE</span>
            <span className="block">REVIEW</span>
          </h1>
        </div>
        <div className="mx-auto mt-9 md:mb-0 mb-5">
          <Link
            href={user ? "/lectureList" : "/api/auth/signin"}
            className="text-center px-4 py-2  bg-[#FCA31C] rounded-md shadow-md text-white text-lg hover:opacity-75"
          >
            今すぐ始める
          </Link>
        </div>
      </div>
      <div className="bottom-0 left-0 w-full md:h-[170px] h-[200px] z-[-1] bg-[#0BA595] absolute"></div>
    </div>
  );
}
