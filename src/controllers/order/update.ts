import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma: PrismaClient = new PrismaClient();

const orderUpdateController = async (req: Request, res: Response) => {
  try {
    if (req.body.order) {
      prisma.order.update({
        where: { id: req.body.order.id },
        data: req.body.order,
      });
      await prisma.orderLog.create({
        data: {
          type: "update",
          orderId: req.body.order.id,
          operatorId: req.body.decodedToken.id,
          content: req.body.order,
        },
      });
    }
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default orderUpdateController;
