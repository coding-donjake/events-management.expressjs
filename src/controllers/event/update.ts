import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma: PrismaClient = new PrismaClient();

const eventUpdateController = async (req: Request, res: Response) => {
  try {
    if (req.body.event) {
      await prisma.event.update({
        where: { id: req.body.event.id },
        data: req.body.event,
      });
      await prisma.eventLog.create({
        data: {
          type: "update",
          eventId: req.body.event.id,
          operatorId: req.body.decodedToken.id,
          content: req.body.event,
        },
      });
    }
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default eventUpdateController;
