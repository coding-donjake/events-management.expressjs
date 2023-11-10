import { PrismaClient } from "@prisma/client";
import { comparePasswords } from "./hash-service";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const prisma: PrismaClient = new PrismaClient();

export const authenticateAdmin = async (username: string, password: string) => {
  /**
   * This function will verify admin thru login.
   *
   * If the provided username has no match on the database, it will return false.
   * If the provided password didn't match on the hashed password, it will return false.
   * It will return an object with the admin credentials {id, username, status}
   */

  const user = await prisma.user.findFirst({
    where: {
      AND: [{ Admin: { username: username } }, { Admin: { status: "ok" } }],
    },
    select: {
      id: true,
      Admin: {
        select: {
          id: true,
          username: true,
          password: true,
          status: true,
        },
      },
    },
  });
  if (!user) return false;
  if (!(await comparePasswords(password, user.Admin?.password!))) return false;
  delete (user as any).Admin.password;
  return user;
};

export const authenticateUser = async (username: string, password: string) => {
  /**
   * This function will verify user thru login.
   *
   * If the provided username has no match on the database, it will return false.
   * If the provided password didn't match on the hashed password, it will return false.
   * It will return an object with the user credentials {id, username, status}
   */

  const user = await prisma.user.findFirst({
    where: {
      AND: [
        { username: username },
        {
          OR: [{ status: "unverified" }, { status: "ok" }],
        },
      ],
    },
    select: {
      id: true,
      username: true,
      password: true,
      status: true,
    },
  });
  if (!user) return false;
  if (!(await comparePasswords(password, user.password!))) return false;
  delete (user as any).password;
  return user;
};

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   * This function will verify the admin.
   *
   * If the id from a decoded token didn't match on the database record, it will return 401 (Unauthorized).
   */

  const admin = await prisma.admin.findUnique({
    where: { id: req.body.decodedToken.Admin.id },
  });
  if (!admin || admin.status !== "ok") {
    return res.status(401).send();
  }
  next();
};

export const verifyAdminPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   * This function will verify admin password.
   *
   * If the admin is not found or the status is != ok, it will return 401 (Unauthorized).
   * If the password doesn't match, it will return 401 (Unauthorized).
   */
  if (!req.body.password) return res.status(400).send();
  const admin = await prisma.admin.findUnique({
    where: { id: req.body.decodedToken.Admin.id },
  });
  if (!admin || admin.status !== "ok") {
    return res.status(401).send();
  }
  if (!(await comparePasswords(req.body.password, admin.password)))
    return res.status(401).send();
  next();
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   * This function will verify token from Authorization header.
   *
   * If there is no token on the Authorization header, it will return 401 (Unauthorized).
   * If the token is not verified as valid, it will return 403 (Forbidden).
   */
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).send();
  jwt.verify(token, process.env.SECRET_KEY!, (err, decoded) => {
    if (err) return res.status(403).send();
    req.body.decodedToken = decoded;
    next();
  });
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   * This function will verify the user.
   *
   * If the id from a decoded token didn't match on the database record, it will return 401 (Unauthorized).
   */

  const user = await prisma.user.findUnique({
    where: { id: req.body.decodedToken.id },
  });
  if (!user || (user.status !== "ok" && user.status !== "unverified")) {
    return res.status(401).send();
  }
  next();
};
