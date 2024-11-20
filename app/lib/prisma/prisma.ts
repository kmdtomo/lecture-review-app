import { PrismaClient } from "@prisma/client";


//起動時に一度だけインスタンス化を行い、その後は再利用
const globalForPrisma = global as unknown as {//unknownで型エラー回避
  prisma: PrismaClient | undefined;
};

if (!globalForPrisma.prisma) {//globalがなかった時にnew PrismaClientでインスタンス化
  globalForPrisma.prisma = new PrismaClient();
}
//prismaを呼び出せばglobalで使える
const prisma: PrismaClient = globalForPrisma.prisma;

export default prisma;

//Prisma Clientは、データベーススキーマに基づいて自動生成されたクライアントライブラリ
//risma Clientはスキーマ定義を解釈して、それに対応するデータベース操作を可能にするツールです。