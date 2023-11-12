import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { hashPassword } from "../../services/hash-service";

const prisma: PrismaClient = new PrismaClient();

const supplierUpdateController = async (req: Request, res: Response) => {
  try {
    if (req.body.supplier) {
      await prisma.supplier.update({
        where: { id: req.body.supplier.id },
        data: req.body.supplier,
      });
      await prisma.supplierLog.create({
        data: {
          type: "update",
          supplierId: req.body.supplier.id,
          operatorId: req.body.decodedToken.id,
          content: req.body.supplier,
        },
      });
    }
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default supplierUpdateController;
