import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import taskSelectConstant from "../../constants/task/select";

const prisma: PrismaClient = new PrismaClient();

const taskSelectController = async (req: Request, res: Response) => {
  try {
    let result = await prisma.task.findUnique({
      where: { id: req.body.task.id },
      select: taskSelectConstant,
    });
    if (!result) return res.status(400).send();
    res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default taskSelectController;
