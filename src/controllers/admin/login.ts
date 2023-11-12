import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { authenticateAdmin } from "../../services/auth-service";
import { generateAccessToken } from "../../services/token-service";

const prisma: PrismaClient = new PrismaClient();

const adminLoginController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body.admin;
    const result = await authenticateAdmin(username, password);

    if (!result) {
      res.status(401).send();
      return;
    }
    res.status(200).json({
      accessToken: generateAccessToken(result, process.env.TOKEN_DURATION!),
      username: result.Admin!.username,
      role: result.Admin!.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export default adminLoginController;
