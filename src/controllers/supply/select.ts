import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import supplySelectConstant from "../../constants/supply/select";

const prisma: PrismaClient = new PrismaClient();

const supplySelectController = async (req: Request, res: Response) => {
  try {
    let result = await prisma.supply.findUnique({
      where: { id: req.body.supply.id },
      select: supplySelectConstant,
    });
    if (!result) return res.status(400).send();
    res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default supplySelectController;
