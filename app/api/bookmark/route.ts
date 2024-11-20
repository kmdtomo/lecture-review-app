import prisma from "@/app/lib/prisma/prisma";
import { BookMark } from "@/app/type/type";
import { NextResponse } from "next/server";

//お気に入り登録
export async function POST(request: Request) {
    try {
      const data = await request.json();
      const {userId,lectureId} = data as BookMark
      const bookMark = await prisma.bookmark.create({
        data: {
          userId: userId,
          lectureId: lectureId,
       
        },
      });
  
      return NextResponse.json(bookMark, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "お気に入り取得失敗" },
        { status: 500 }
      );
    }
  }
  
