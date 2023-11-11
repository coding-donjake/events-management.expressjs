import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const decodeToken = async (
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

export const generateAccessToken = (content: object, duration: string) => {
  const token: string = jwt.sign(content, process.env.SECRET_KEY!, {
    expiresIn: duration,
  });
  return token;
};
