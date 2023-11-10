import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import eventOrderByConstant from "../../constants/event/order-by";
import eventSelectConstant from "../../constants/event/select";

const prisma: PrismaClient = new PrismaClient();

const eventGetController = async (req: Request, res: Response) => {
  try {
    let result = await prisma.event.findMany({
      where:
        req.body.key || req.body.status
          ? {
              AND: [
                req.body.key
                  ? {
                      OR: [
                        {
                          name: req.body.key,
                        },
                        {
                          type: req.body.key,
                        },
                        {
                          Customer: {
                            User: {
                              lastName: req.body.key,
                            },
                          },
                        },
                        {
                          Customer: {
                            User: {
                              firstName: req.body.key,
                            },
                          },
                        },
                        {
                          Customer: {
                            User: {
                              middleName: req.body.key,
                            },
                          },
                        },
                      ],
                    }
                  : {},
                req.body.status ? { status: req.body.status } : {},
              ],
            }
          : {},
      orderBy: eventOrderByConstant,
      select: eventSelectConstant,
    });
    if (!result) return res.status(400).send();
    res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default eventGetController;
