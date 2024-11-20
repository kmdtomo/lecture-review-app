import prisma from "@/app/lib/prisma/prisma";
import { Review } from "@/app/type/type";
import { NextResponse } from "next/server";


//レビュー投稿用
export async function POST(request:Request){
    const {userId,lectureId,atmosphereRating,futureRating,easinessRating,comment}:Review = await request.json()

    try{
        const review = await prisma.review.create({
            data:{
                userId:userId,
                lectureId:lectureId,
                atmosphereRating:atmosphereRating,
                futureRating:futureRating,
                easinessRating:easinessRating,
                comment:comment
            }
        })

        return NextResponse.json(review,{status:200})

    }catch(err){
        return NextResponse.json({err,message:"レビューを取得できません"},{status:500})
        

    }
}
    

//レビュー保存用
export async function GET(request:Request,{params}:{params:{userId:string,lectureId:string}}){
    const {lectureId} = params;

    try{
        const review = await prisma.review.findMany({
           where:{
            lectureId:lectureId
           } 
        })
        return NextResponse.json(review,{status:200})

    }catch(error){
    return NextResponse.json(error,{status:500})}
  
}

export async function DELETE(request:Request){
    const {id}:Review = await request.json() 
    try{
        const deleteReview = await prisma.review.deleteMany({
            where:{
                id:id,
            }
        })
        if (deleteReview.count > 0){
        return NextResponse.json(deleteReview,{status:200}),{message:"削除成功"}
        }else {
            return NextResponse.json({ message: "レビューが見つかりません" }),{status:404};
          }

    }catch(error){
        return NextResponse.json({error,message:"削除失敗"}),{status:500}

    }
}
