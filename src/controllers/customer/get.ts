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
                          User: { UserInformation: { lastName: req.body.key } },
                        },
                        {
                          User: {
                            UserInformation: { firstName: req.body.key },
                          },
                        },
                        {
                          User: {
                            UserInformation: { middleName: req.body.key },
                          },
                        },
                      ],
                    }
                  : {},
                req.body.status ? { status: req.body.status } : {},
              ],
            }
          : {},
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
