import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { hashPassword } from "../../services/hash-service";

const prisma: PrismaClient = new PrismaClient();

const adminUpdateController = async (req: Request, res: Response) => {
  try {
    if (req.body.user) {
      prisma.user.update({
        where: { id: req.body.user.id },
        data: req.body.user,
      });
      await prisma.userLog.create({
        data: {
          type: "update",
          userId: req.body.user.id,
          operatorId: req.body.decodedToken.id,
          content: req.body.user,
        },
      });
    }
    if (req.body.userInformation) {
      prisma.userInformation.update({
        where: { id: req.body.userInformation.id },
        data: req.body.userInformation,
      });
      await prisma.userInformationLog.create({
        data: {
          type: "update",
          userInformationId: req.body.userInformation.id,
          operatorId: req.body.decodedToken.id,
          content: req.body.userInformation,
        },
      });
    }
    if (req.body.admin) {
      if (req.body.admin.password)
        req.body.admin.password = await hashPassword(req.body.admin.password);
      prisma.admin.update({
        where: { id: req.body.admin.id },
        data: req.body.admin,
      });
      await prisma.adminLog.create({
        data: {
          type: "update",
          adminId: req.body.admin.id,
          operatorId: req.body.decodedToken.id,
          content: req.body.admin,
        },
      });
    }
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default adminUpdateController;
