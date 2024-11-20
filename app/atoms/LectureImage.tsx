import Image from "next/image";
import { Lecture } from "../type/type";
import { FC } from "react";

type Props = {
  lecture: Lecture | null;
};

export const LectureImage: FC<Props> = ({ lecture }) => {
  return (
    <>
      {(() => {
        // カテゴリーごとに画像を変える
        switch (lecture?.category) {
          case "RD":
            return (
              <Image src="/RD.png" alt="RD" layout="fill" objectFit="cover" />
            );
          case "D1":
            return (
              <Image src="/D1.png" alt="D1" layout="fill" objectFit="cover" />
            );
          case "D2":
            return (
              <Image src="/D2.png" alt="D2" layout="fill" objectFit="cover" />
            );
          case "D3":
            return (
              <Image src="/D3.png" alt="D3" layout="fill" objectFit="cover" />
            );
          case "D4":
            return (
              <Image src="/D4.png" alt="D4" layout="fill" objectFit="cover" />
            );
          default:
            return null;
        }
      })()}
    </>
  );
};
