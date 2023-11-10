import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const decodeToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   * This function will decode the token that is pass thru an authorization header.
   *
   * It will return an HTTP error 401 (Unauthorized) if there is no token.
   * It will return an HTTP error 403 (Forbidden) if the token cannot be decode.
   * It will store the value of the token inside of req.body using decodedToken as property.
   */

  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).send();
  jwt.verify(token, process.env.SECRET_KEY!, (err, decoded) => {
    if (err) return res.status(403).send();
    req.body.decodedToken = decoded;
    next();
  });
};

export const generateAccessToken = (content: object, duration: string) => {
  // This function will generate an access token that will be used as a session.

  const token: string = jwt.sign(content, process.env.SECRET_KEY!, {
    expiresIn: duration,
  });
  return token;
};
