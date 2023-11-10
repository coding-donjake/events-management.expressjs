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
  // This function will compare if the readable password is match on the hashed one.

  const match = await compare(password, hashedPassword);
  return match;
};

export const hashPassword = async (password: string) => {
  // This function will hash a readable string into an encrypted one.

  const hashedPassword = await hash(password, saltRounds);
  return hashedPassword;
};
