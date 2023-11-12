import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { hashPassword } from "../../services/hash-service";

const prisma: PrismaClient = new PrismaClient();

const supplyCreateController = async (req: Request, res: Response) => {
  try {
    const supply = await prisma.supply.create({ data: req.body.supply });
    await prisma.supplyLog.create({
      data: {
        type: "create",
        supplyId: supply.id,
        operatorId: req.body.decodedToken.id,
        content: supply,
      },
    });
    res.status(200).json({ id: supply.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default supplyCreateController;
