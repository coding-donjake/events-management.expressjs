import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { hashPassword } from "../../services/hash-service";

const prisma: PrismaClient = new PrismaClient();

const adminCreateController = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.create({ data: req.body.user });
    await prisma.userLog.create({
      data: {
        type: "create",
        userId: user.id,
        operatorId: req.body.decodedToken.id,
        content: user,
      },
    });
    req.body.admin.userId = user.id;
    req.body.admin.password = await hashPassword(req.body.admin.password);
    const admin = await prisma.admin.create({ data: req.body.admin });
    await prisma.adminLog.create({
      data: {
        type: "create",
        adminId: admin.id,
        operatorId: req.body.decodedToken.id,
        content: admin,
      },
    });
    res.status(200).json({ id: admin.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default adminCreateController;
