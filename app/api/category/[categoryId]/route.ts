import { supabase } from "@/app/lib/supabase/supabaseClient"
import { NextResponse } from "next/server"

export async function GET(request:Request,{params}:{params:{categoryId:string}}){
    const category = params.categoryId
    try{
        const {data:lecture,error} = await supabase.from("lecture").select("*").eq("category",category)
        if(error)
            return({message:"講義内容が取れません"})
        return NextResponse.json(lecture,{status:200})

    }catch(error){
        return NextResponse.json({error,message:"エラーが発生しました"},{status:500})


    }
}