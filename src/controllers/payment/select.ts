import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import paymentSelectConstant from "../../constants/payment/select";

const prisma: PrismaClient = new PrismaClient();

const paymentSelectController = async (req: Request, res: Response) => {
  try {
    let result = await prisma.payment.findUnique({
      where: { id: req.body.payment.id },
      select: paymentSelectConstant,
    });
    if (!result) return res.status(400).send();
    res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default paymentSelectController;
