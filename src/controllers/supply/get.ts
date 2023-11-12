import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import supplyOrderByConstant from "../../constants/supply/order-by";
import supplySelectConstant from "../../constants/supply/select";

const prisma: PrismaClient = new PrismaClient();

const supplyGetController = async (req: Request, res: Response) => {
  try {
    let result = await prisma.supply.findMany({
      where:
        req.body.key || req.body.status
          ? {
              AND: [
                req.body.key
                  ? {
                      OR: [
                        { name: req.body.key },
                        { brand: req.body.key },
                        { type: req.body.key },
                      ],
                    }
                  : {},
                req.body.status ? { status: req.body.status } : {},
              ],
            }
          : {},
      orderBy: supplyOrderByConstant,
      select: supplySelectConstant,
    });
    if (!result) return res.status(400).send();
    res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default supplyGetController;
