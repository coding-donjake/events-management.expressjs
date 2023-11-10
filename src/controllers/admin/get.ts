import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import adminOrderByConstant from "../../constants/admin/order-by";
import adminSelectConstant from "../../constants/admin/select";

const prisma: PrismaClient = new PrismaClient();

const adminGetController = async (req: Request, res: Response) => {
  try {
    let result = await prisma.admin.findMany({
      where:
        req.body.key || req.body.status
          ? {
              AND: [
                req.body.key
                  ? {
                      OR: [
                        { username: req.body.key },
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
      orderBy: adminOrderByConstant,
      select: adminSelectConstant,
    });
    if (!result) return res.status(400).send();
    res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default adminGetController;
