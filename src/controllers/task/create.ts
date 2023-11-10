import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma: PrismaClient = new PrismaClient();

const taskCreateController = async (req: Request, res: Response) => {
  try {
    const task = await prisma.task.create({ data: req.body.task });
    await prisma.taskLog.create({
      data: {
        type: "create",
        taskId: task.id,
        operatorId: req.body.decodedToken.id,
        content: task,
      },
    });
    res.status(200).json({ id: task.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default taskCreateController;
