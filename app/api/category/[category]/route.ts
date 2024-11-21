import { supabase } from "@/app/lib/supabase/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string }> } // Promiseでラップ
) { // 返り値の型を明示的に指定
    try {
        const { category } = await params; // await で params を解決

        const { data, error } = await supabase
            .from("lecture")
            .select("*")
            .eq("category", category);

        if (error) {
            return NextResponse.json(error, { status: 500 });
        }

        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}