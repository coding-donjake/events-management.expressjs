import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import paymentSelectConstant from "../../constants/payment/select";
import paymentOrderByConstant from "../../constants/payment/order-by";

const prisma: PrismaClient = new PrismaClient();

const paymentGetController = async (req: Request, res: Response) => {
  try {
    let result = await prisma.payment.findMany({
      where:
        req.body.key || req.body.status
          ? {
              AND: [
                req.body.key
                  ? {
                      OR: [
                        {
                          Event: {
                            name: req.body.key,
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
      orderBy: paymentOrderByConstant,
      select: paymentSelectConstant,
    });
    if (!result) return res.status(400).send();
    res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default paymentGetController;
