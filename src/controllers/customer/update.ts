import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma: PrismaClient = new PrismaClient();

const customerUpdateController = async (req: Request, res: Response) => {
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
    if (req.body.customer) {
      prisma.customer.update({
        where: { id: req.body.customer.id },
        data: req.body.customer,
      });
      await prisma.customerLog.create({
        data: {
          type: "update",
          customerId: req.body.customer.id,
          operatorId: req.body.decodedToken.id,
          content: req.body.customer,
        },
      });
    }
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default customerUpdateController;
