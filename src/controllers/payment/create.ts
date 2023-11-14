import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma: PrismaClient = new PrismaClient();

const paymentCreateController = async (req: Request, res: Response) => {
  try {
    const payment = await prisma.payment.create({ data: req.body.payment });
    await prisma.paymentLog.create({
      data: {
        type: "create",
        paymentId: payment.id,
        operatorId: req.body.decodedToken.id,
        content: payment,
      },
    });
    await prisma.event.update({
      where: { id: payment.eventId! },
      data: {
        balance: { decrement: payment.amount },
      },
    });
    res.status(200).json({ id: payment.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default paymentCreateController;
