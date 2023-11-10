import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import eventSelectConstant from "../../constants/event/select";

const prisma: PrismaClient = new PrismaClient();

const eventSelectController = async (req: Request, res: Response) => {
  try {
    let result = await prisma.event.findUnique({
      where: { id: req.body.event.id },
      select: eventSelectConstant,
    });
    if (!result) return res.status(400).send();
    res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default eventSelectController;
