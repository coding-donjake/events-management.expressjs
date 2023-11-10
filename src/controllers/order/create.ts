import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma: PrismaClient = new PrismaClient();

const orderCreateController = async (req: Request, res: Response) => {
  try {
    const order = await prisma.order.create({ data: req.body.order });
    await prisma.orderLog.create({
      data: {
        type: "create",
        orderId: order.id,
        operatorId: req.body.decodedToken.id,
        content: order,
      },
    });
    res.status(200).json({ id: order.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default orderCreateController;
