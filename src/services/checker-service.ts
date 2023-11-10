import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma: PrismaClient = new PrismaClient();

export const checkAdminUsernameAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   * This function will check of the username is available to use in admin registration.
   *
   * If the username is taken, it will return 409 (Resource Conflict).
   */
  const exists = await prisma.admin.findUnique({
    where: {
      username: req.body.admin.username,
    },
  });
  if (exists) return res.status(409).send();
  next();
};
