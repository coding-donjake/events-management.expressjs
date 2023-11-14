import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import customerOrderByConstant from "../../constants/customer/order-by";
import customerSelectConstant from "../../constants/customer/select";

const prisma: PrismaClient = new PrismaClient();

const customerGetController = async (req: Request, res: Response) => {
  try {
    let result = await prisma.customer.findMany({
      where:
        req.body.key || req.body.status
          ? {
              AND: [
                req.body.key
                  ? {
                      OR: [
                        {
                          User: { lastName: req.body.key },
                        },
                        {
                          User: { firstName: req.body.key },
                        },
                        {
                          User: { middleName: req.body.key },
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
      orderBy: customerOrderByConstant,
      select: customerSelectConstant,
    });
    if (!result) return res.status(400).send();
    res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default customerGetController;
