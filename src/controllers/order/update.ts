import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import supplySelectConstant from "../../constants/supply/select";

const prisma: PrismaClient = new PrismaClient();

const orderUpdateController = async (req: Request, res: Response) => {
  try {
    if (req.body.order) {
      await prisma.order.update({
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
      if (req.body.order.status !== "arrived") return res.status(200).send();
    }
    for (let i = 0; i < req.body.orderSupply.length; i++) {
      const element = req.body.orderSupply[i];
      let supply = await prisma.supply.update({
        where: { id: element.supplyId },
        data: { stock: { increment: element.quantity } },
        select: supplySelectConstant,
      });
      await prisma.supplyLog.create({
        data: {
          type: "update",
          supplyId: req.body.supply.id,
          operatorId: req.body.decodedToken.id,
          content: supply,
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
