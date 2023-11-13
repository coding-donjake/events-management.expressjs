import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma: PrismaClient = new PrismaClient();

const taskUpdateController = async (req: Request, res: Response) => {
  try {
    if (req.body.task) {
      await prisma.task.update({
        where: { id: req.body.task.id },
        data: req.body.task,
      });
      await prisma.taskLog.create({
        data: {
          type: "update",
          taskId: req.body.task.id,
          operatorId: req.body.decodedToken.id,
          content: req.body.task,
        },
      });
    }
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default taskUpdateController;
