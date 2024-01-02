import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import eventSelectConstant from "../../constants/event/select";

const prisma: PrismaClient = new PrismaClient();

const paymentCreateController = async (req: Request, res: Response) => {
  try {
    let event = await prisma.event.findUnique({
      where: { id: req.body.event.id },
      select: eventSelectConstant,
    });
    if ((event as any)!.balance - req.body.payment.amount < 0) {
      res.status(501).json();
      return;
    }
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
      where: { id: req.body.event.id! },
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
