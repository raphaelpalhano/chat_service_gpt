import { PrismaClient } from "@prisma/client";

const globalFormPrisma = global as { prisma?: PrismaClient };

export const prisma = globalFormPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV == "development") globalFormPrisma.prisma = prisma;


