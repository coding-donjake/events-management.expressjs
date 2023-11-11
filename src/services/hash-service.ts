import * as bcrypt from "bcrypt";
import * as util from "util";

const saltRounds: number = 10;

const compare: (password: string, hashedPassword: string) => Promise<boolean> =
  util.promisify(bcrypt.compare);
const hash: (password: string, saltRounds: number) => Promise<string> =
  util.promisify(bcrypt.hash);

export const comparePasswords = async (
  password: string,
  hashedPassword: string
) => {
  const match = await compare(password, hashedPassword);
  return match;
};

export const hashPassword = async (password: string) => {
  const hashedPassword = await hash(password, saltRounds);
  return hashedPassword;
};
