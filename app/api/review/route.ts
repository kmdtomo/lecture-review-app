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
export async function GET(request:Request,{params}:{params:Promise<{userId:string,lectureId:string}>}){
    const {lectureId} = await params;

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


