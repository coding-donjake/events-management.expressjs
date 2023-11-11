import { PrismaClient } from "@prisma/client";
import { comparePasswords } from "./hash-service";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const prisma: PrismaClient = new PrismaClient();

export const authenticateAdmin = async (username: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: {
      AND: [{ Admin: { username: username } }, { Admin: { status: "active" } }],
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

// export const authenticateUser = async (username: string, password: string) => {
//   const user = await prisma.user.findFirst({
//     where: {
//       AND: [
//         { username: username },
//         {
//           OR: [{ status: "unverified" }, { status: "active" }],
//         },
//       ],
//     },
//     select: {
//       id: true,
//       username: true,
//       password: true,
//       status: true,
//     },
//   });
//   if (!user) return false;
//   if (!(await comparePasswords(password, user.password!))) return false;
//   delete (user as any).password;
//   return user;
// };

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const admin = await prisma.admin.findUnique({
    where: { id: req.body.decodedToken.Admin.id },
  });
  if (!admin || admin.status !== "active") {
    return res.status(401).send();
  }
  next();
};

export const verifyAdminPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.password) return res.status(400).send();
  const admin = await prisma.admin.findUnique({
    where: { id: req.body.decodedToken.Admin.id },
  });
  if (!admin || admin.status !== "active") {
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
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).send();
  jwt.verify(token, process.env.SECRET_KEY!, (err, decoded) => {
    if (err) return res.status(403).send();
    req.body.decodedToken = decoded;
    next();
  });
};

// export const verifyUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const user = await prisma.user.findUnique({
//     where: { id: req.body.decodedToken.id },
//   });
//   if (!user || (user.status !== "active" && user.status !== "unverified")) {
//     return res.status(401).send();
//   }
//   next();
// };
