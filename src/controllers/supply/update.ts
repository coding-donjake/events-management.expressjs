import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { hashPassword } from "../../services/hash-service";

const prisma: PrismaClient = new PrismaClient();

const supplyUpdateController = async (req: Request, res: Response) => {
  try {
    if (req.body.supply) {
      await prisma.supply.update({
        where: { id: req.body.supply.id },
        data: req.body.supply,
      });
      await prisma.supplyLog.create({
        data: {
          type: "update",
          supplyId: req.body.supply.id,
          operatorId: req.body.decodedToken.id,
          content: req.body.supply,
        },
      });
    }
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default supplyUpdateController;
