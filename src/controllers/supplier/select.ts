import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import supplierSelectConstant from "../../constants/supplier/select";

const prisma: PrismaClient = new PrismaClient();

const supplierSelectController = async (req: Request, res: Response) => {
  try {
    let result = await prisma.supplier.findUnique({
      where: { id: req.body.supplier.id },
      select: supplierSelectConstant,
    });
    if (!result) return res.status(400).send();
    res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default supplierSelectController;
