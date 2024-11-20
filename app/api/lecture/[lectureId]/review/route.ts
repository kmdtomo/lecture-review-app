import prisma from "@/app/lib/prisma/prisma";
import { NextResponse } from "next/server";

//lectureIdからレビューを取得

export async function GET(request:Request,{params}:{params:Promise<{ lectureId: string }> }
    ): Promise<NextResponse> {
    const {lectureId} =  await params;
    try{
        //prismaのreviewからparamsのlectureIdをとってくる
        const getReviews = await prisma.review.findMany({
            where:{lectureId},
            include:{
                user:{select:{name:true,image:true}}
            }
        })
        if (getReviews.length === 0) {
            return NextResponse.json({ message: "レビューが見つかりません" }, { status: 404 });
        }
        return NextResponse.json(getReviews,{status:200})

    }catch(error){
        console.error(error)
return NextResponse.json({message:"レビューの取得に失敗しました"},{status:500})
    }
}