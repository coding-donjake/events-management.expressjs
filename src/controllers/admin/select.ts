import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import adminSelectConstant from "../../constants/admin/select";

const prisma: PrismaClient = new PrismaClient();

const adminSelectController = async (req: Request, res: Response) => {
  try {
    let result = await prisma.admin.findUnique({
      where: { id: req.body.admin.id },
      select: adminSelectConstant,
    });
    if (!result) return res.status(400).send();
    res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default adminSelectController;
