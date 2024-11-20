import prisma from "@/app/lib/prisma/prisma";
import { NextResponse } from "next/server";

//全レビューを取得

export async function GET(){
    
    try{
        //prismaのreviewからparamsのlectureIdをとってくる
        const getAllRatings = await prisma.review.findMany({
         
            
        })
            
        return NextResponse.json(getAllRatings,{status:200})

    }catch(error){
        console.error(error)
return NextResponse.json({message:"レビューの取得に失敗しました"},{status:500})
    }
}