import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma: PrismaClient = new PrismaClient();

const eventCreateController = async (req: Request, res: Response) => {
  try {
    const event = await prisma.event.create({ data: req.body.event });
    await prisma.eventLog.create({
      data: {
        type: "create",
        eventId: event.id,
        operatorId: req.body.decodedToken.id,
        content: event,
      },
    });
    res.status(200).json({ id: event.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default eventCreateController;
