import bcrypt from "bcrypt";

export const comparePassword = async (
  password: string,
  hashPassword: string
) => {
  const isTrue = await bcrypt.compare(password, hashPassword);
  return isTrue;
};
