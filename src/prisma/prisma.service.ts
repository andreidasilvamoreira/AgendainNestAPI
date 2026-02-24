import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

function mariadbConfigFromUrl(databaseUrl: string) {
  const u = new URL(databaseUrl);

  return {
    host: u.hostname,
    port: Number(u.port || 3306),
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname.replace(/^\//, ""),
  };
}

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) throw new Error("DATABASE_URL não definido no ambiente");

    const adapter = new PrismaMariaDb(mariadbConfigFromUrl(dbUrl));
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
    console.log("Prisma conectado");
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}