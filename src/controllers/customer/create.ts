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
    req.body.email.customerId = customer.id;
    req.body.email.domain = req.body.email.content.split("@")[1];
    const email = await prisma.email.create({ data: req.body.email });
    await prisma.emailLog.create({
      data: {
        type: "create",
        emailId: email.id,
        operatorId: req.body.decodedToken.id,
        content: email,
      },
    });
    req.body.simcard.customerId = customer.id;
    req.body.simcard.idc = "+63";
    const simcard = await prisma.simcard.create({ data: req.body.simcard });
    await prisma.simcardLog.create({
      data: {
        type: "create",
        simcardId: simcard.id,
        operatorId: req.body.decodedToken.id,
        content: simcard,
      },
    });
    res.status(200).json({ id: customer.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default customerCreateController;
