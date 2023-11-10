import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma: PrismaClient = new PrismaClient();

const customerCreateController = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.create({ data: req.body.user });
    await prisma.userLog.create({
      data: {
        type: "create",
        userId: user.id,
        operatorId: req.body.decodedToken.id,
        content: user,
      },
    });
    req.body.customer.userId = user.id;
    const customer = await prisma.customer.create({ data: req.body.customer });
    await prisma.customerLog.create({
      data: {
        type: "create",
        customerId: customer.id,
        operatorId: req.body.decodedToken.id,
        content: customer,
      },
    });
    res.status(200).json({ id: customer.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default customerCreateController;
