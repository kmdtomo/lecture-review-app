"use client";

import { ChangeEvent, FC, useState } from "react";

//検索機能

type Props = {
  setSearchKeyword: (keyword: string) => void;
};

export const SerchLecture: FC<Props> = ({ setSearchKeyword }) => {
  const [search, setSearch] = useState("");

  const onChangeSerch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setSearchKeyword(value);
  };

  return (
    <div className="flex flex-row justify-end">
      <input
        type="text"
        placeholder="講義を検索"
        value={search}
        onChange={onChangeSerch}
        className="p-2 border border-[#888888]-2  rounded-md  text-sm text-[#88888] md:w-full w-[150px]"
      />
    </div>
  );
};

export default SerchLecture;
