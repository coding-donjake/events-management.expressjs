import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma: PrismaClient = new PrismaClient();

const paymentUpdateController = async (req: Request, res: Response) => {
  try {
    if (req.body.payment) {
      prisma.payment.update({
        where: { id: req.body.payment.id },
        data: req.body.payment,
      });
      await prisma.paymentLog.create({
        data: {
          type: "update",
          paymentId: req.body.payment.id,
          operatorId: req.body.decodedToken.id,
          content: req.body.payment,
        },
      });
    }
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default paymentUpdateController;
