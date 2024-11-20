import prisma from "@/app/lib/prisma/prisma"
import { supabase } from "@/app/lib/supabase/supabaseClient";

import { NextResponse } from "next/server"

{/**レビュー内容を取得し、
    そのlectureIdと同一のlecture_nameをsupabaseから取得 */}

export async function GET( request:Request,{params}:{params:{userId:string}}){
    const userId  = params.userId
    try{
     const getReview = await prisma.review.findMany({
        where:{userId:userId},
    
        });
        
        const reviewWithLectureName = await Promise.all(//Promise.allで全ての処理が完了するまで待機し、全ての結果を配列で返す
            getReview.map(async (review) =>{
                if(!review.lectureId){
                    return {...review,lecture_name:""}
                
                }
                const {data:lecture,error} = await supabase
                .from("lecture")
                .select("lecture_name")
                .eq("id",review.lectureId)//review.lectureIdと同じidのみ取得
                if(error){
                    return {...review,lecture_name:""}
                }
                //reviewの配列の中にlecture_nameという要素を追加
                return{...review,lecture_name:lecture[0].lecture_name}
    })

            )
          
        return NextResponse.json(reviewWithLectureName,{status:200})
    }catch(error){
        return NextResponse.json({error,message:"ユーザーのレビューが見つかりません"},{status:500})

    }
}



