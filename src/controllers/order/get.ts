import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import orderOrderByConstant from "../../constants/order/order-by";
import orderSelectConstant from "../../constants/order/select";

const prisma: PrismaClient = new PrismaClient();

const orderGetController = async (req: Request, res: Response) => {
  try {
    let result = await prisma.order.findMany({
      where:
        req.body.key || req.body.status
          ? {
              AND: [
                req.body.key
                  ? {
                      OR: [
                        {
                          Supplier: {
                            name: req.body.key,
                          },
                        },
                        {
                          Supplier: {
                            phone: req.body.key,
                          },
                        },
                        {
                          Supplier: {
                            email: req.body.key,
                          },
                        },
                      ],
                    }
                  : {},
                req.body.status
                  ? { status: req.body.status }
                  : { status: { not: "removed" } },
              ],
            }
          : { status: { not: "removed" } },
      orderBy: orderOrderByConstant,
      select: orderSelectConstant,
    });
    if (!result) return res.status(400).send();
    res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default orderGetController;
