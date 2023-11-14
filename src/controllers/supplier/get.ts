import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import supplierOrderByConstant from "../../constants/supplier/order-by";
import supplierSelectConstant from "../../constants/supplier/select";

const prisma: PrismaClient = new PrismaClient();

const supplierGetController = async (req: Request, res: Response) => {
  try {
    let result = await prisma.supplier.findMany({
      where:
        req.body.key || req.body.status
          ? {
              AND: [
                req.body.key
                  ? {
                      OR: [
                        { name: req.body.key },
                        { phone: req.body.key },
                        { email: req.body.key },
                      ],
                    }
                  : {},
                req.body.status
                  ? { status: req.body.status }
                  : { status: { not: "removed" } },
              ],
            }
          : { status: { not: "removed" } },
      orderBy: supplierOrderByConstant,
      select: supplierSelectConstant,
    });
    if (!result) return res.status(400).send();
    res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default supplierGetController;
