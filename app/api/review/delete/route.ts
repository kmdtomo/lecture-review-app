import prisma from "@/app/lib/prisma/prisma";
import { Review } from "@/app/type/type";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const data = await request.json();
    const { id } = data as Review;

    const deleteReview = await prisma.review.deleteMany({
      where: {
        id: id,
      },
    });

    if (deleteReview.count > 0) {
      return NextResponse.json(deleteReview, { status: 200 }),{ message:"削除成功"}; // レスポンスにメッセージを追加
    } else {
      return NextResponse.json({ message: "レビューが見つかりません" }, { status: 404 }); // NextResponseを返す
    }
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json({ message: "削除失敗", error }, { status: 500 }); // エラーメッセージとエラーオブジェクトを返す
  }
}