import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import customerSelectConstant from "../../constants/customer/select";

const prisma: PrismaClient = new PrismaClient();

const customerSelectController = async (req: Request, res: Response) => {
  try {
    let result = await prisma.customer.findUnique({
      where: { id: req.body.customer.id },
      select: customerSelectConstant,
    });
    if (!result) return res.status(400).send();
    res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default customerSelectController;
