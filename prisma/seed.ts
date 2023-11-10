import { PrismaClient } from "@prisma/client";
import { adminSeed } from "./admin";
import { hashPassword } from "../src/services/hash-service";

const prisma = new PrismaClient();

let main = async () => {
  // creating User
  const user = await prisma.user.create({ data: { status: "ok" } });
  // creating UserInformation
  adminSeed.userInformation.userId = user.id;
  const userInformation = await prisma.userInformation.create({
    data: adminSeed.userInformation as any,
  });
  // creating Admin
  adminSeed.admin.userId = user.id;
  adminSeed.admin.password = await hashPassword(adminSeed.admin.password);
  const admin = await prisma.admin.create({ data: adminSeed.admin as any });
};

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    console.log("seeding complete.");
    prisma.$disconnect();
  });
