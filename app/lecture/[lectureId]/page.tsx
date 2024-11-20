import LectureDetail from "@/app/componets/LectureDtail";
import { nextAuthOptions } from "@/app/lib/next-auth/option";
import { Lecture } from "@/app/type/type";
import { getServerSession } from "next-auth";

type PageProps = {
  params: Promise<{
    lectureId: string;
  }>;
};

export default async function LectureDetailPage({ params }: PageProps) {
  const { lectureId } = await params;
  const session = await getServerSession(nextAuthOptions);
  const userId = session?.user?.id ?? undefined;

  const getLectureDetail = async (): Promise<Lecture | null> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/lecture/${lectureId}`,
        { cache: "no-store" }
      );
      if (!response.ok) {
        throw new Error("講義データを取得できません");
      }
      const lecture = await response.json();
      return lecture;
    } catch (error) {
      console.error("講義内容を取得できません", error);
      return null;
    }
  };

  const lecture = await getLectureDetail();

  return (
    <LectureDetail lectureId={lectureId} userId={userId} lecture={lecture} />
  );
}
