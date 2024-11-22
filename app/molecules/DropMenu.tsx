import Link from "next/link";
import { FaCaretDown } from "react-icons/fa";

export const DropMenu = () => {
  return (
    <div>
      <div className="flex justify-end items-center">
        <div className="my-3 md:mr-8 mr-4 ">
          <label
            htmlFor="menuToggle"
            className="cursor-pointer border border-[#888888]-2 px-4 py-2 text-sm text-[#888888] bg-white rounded-md flex items-center justify-between  "
          >
            コースで探す
            <FaCaretDown
              size={25}
              color="#888888"
              className="pl-3"
            ></FaCaretDown>
          </label>
          <input
            type="checkbox"
            id="menuToggle"
            className="hidden peer"
            autoComplete="off"
          />
          {/*カテゴリーページ遷移 */}
          <ul
            id="menu"
            className="hidden peer-checked:block absolute right-0  mt-2 md:w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-20 border border-[##888888]-2"
          >
            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/lectureList/RD`}>
              <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#0BA595] hover:text-white ">
                RD（学系共通）
              </li>
            </Link>
            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/lectureList/D1`}>
              <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#0BA595] hover:text-white ">
                D1
              </li>
            </Link>
            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/lectureList/D2`}>
              <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#0BA595] hover:text-white ">
                D2
              </li>
            </Link>
            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/lectureList/D3`}>
              <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#0BA595] hover:text-white ">
                D3
              </li>
            </Link>
            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/lectureList/D4`}>
              <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#0BA595] hover:text-white pb-2 ">
                D4
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DropMenu;
