import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import orderSelectConstant from "../../constants/order/select";

const prisma: PrismaClient = new PrismaClient();

const orderSelectController = async (req: Request, res: Response) => {
  try {
    let result = await prisma.order.findUnique({
      where: { id: req.body.order.id },
      select: orderSelectConstant,
    });
    if (!result) return res.status(400).send();
    res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default orderSelectController;
