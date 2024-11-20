import { supabase } from "@/app/lib/supabase/supabaseClient"
import { NextResponse } from "next/server"


//講義詳細取得API https://localhost:3000/lecture/1(lectureId)
export async function GET(request:Request,{params}:{params:{lectureId:string}}){
    const {lectureId} = params
    try{

        const{data,error} = await supabase.from("lecture").select("*").eq("id",lectureId).single()
        if(error){
            return NextResponse.json(error,{status:500})
        }
        return NextResponse.json(data,{status:200})

    }catch(err){
        return NextResponse.json(err,{status:500})

    }
}