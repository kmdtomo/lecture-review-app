import LectureDetail from "@/app/componets/LectureDtail";
import { nextAuthOptions } from "@/app/lib/next-auth/option";
import { getServerSession } from "next-auth";

const LectureDetailPage = async ({
  params,
}: {
  params: { lectureId: string };
}) => {
  const { lectureId } = params;
  const session = await getServerSession(nextAuthOptions);
  const userId = session?.user.id ?? undefined;

  const getLectureDetail = async () => {
    try {
      const responce = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/lecture/${lectureId}`
      );
      const lecture = await responce.json();
      return lecture;
    } catch (error) {
      console.error("講義内容を取得できません", error);
    }
  };

  const lecture = await getLectureDetail();

  return (
    <LectureDetail
      lectureId={lectureId}
      userId={userId}
      lecture={lecture}
    ></LectureDetail>
  );
};

export default LectureDetailPage;
