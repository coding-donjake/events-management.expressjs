import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { hashPassword } from "../../services/hash-service";

const prisma: PrismaClient = new PrismaClient();

const supplierCreateController = async (req: Request, res: Response) => {
  try {
    const supplier = await prisma.supplier.create({ data: req.body.supplier });
    await prisma.supplierLog.create({
      data: {
        type: "create",
        supplierId: supplier.id,
        operatorId: req.body.decodedToken.id,
        content: supplier,
      },
    });
    res.status(200).json({ id: supplier.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default supplierCreateController;
