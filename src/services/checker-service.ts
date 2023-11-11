import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma: PrismaClient = new PrismaClient();

export const checkAdminUsernameAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const exists = await prisma.admin.findUnique({
    where: {
      username: req.body.admin.username,
    },
  });
  if (exists) return res.status(409).send();
  next();
};
