import { supabase } from "@/app/lib/supabase/supabaseClient"
import { NextResponse } from "next/server"

export async function GET(request:Request,{params}:{params:{category:string}}){
    const {category} = params
    try{

        const{data,error} = await supabase.from("lecture").select("*").eq("category",category)
        if(error){
            return NextResponse.json(error,{status:500})
        }
        return NextResponse.json(data,{status:200})

    }catch(err){
        return NextResponse.json(err,{status:500})

    }
}