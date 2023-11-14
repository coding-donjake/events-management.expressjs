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
      if (req.body.eventSupply) {
        let eventSupplies = await prisma.eventSupply.findMany({
          where: { eventId: req.body.event.id },
        });
        for (let i = 0; i < eventSupplies.length; i++) {
          const element = eventSupplies[i];
          await prisma.supply.update({
            where: { id: element.supplyId! },
            data: { stock: { increment: element.quantity } },
          });
        }
        await prisma.eventSupply.deleteMany({
          where: { eventId: req.body.event.id },
        });
        for (let i = 0; i < req.body.eventSupply.length; i++) {
          const element = req.body.eventSupply[i];
          element.eventId = req.body.event.id;
          console.log(element);
          const eventSupply = await prisma.eventSupply.create({
            data: element,
          });
          await prisma.eventSupplyLog.create({
            data: {
              type: "create",
              eventSupplyId: eventSupply.id,
              operatorId: req.body.decodedToken.id,
              content: eventSupply,
            },
          });
          await prisma.supply.update({
            where: { id: element.supplyId },
            data: { stock: { decrement: element.quantity } },
          });
        }
      }
    }
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default eventUpdateController;
