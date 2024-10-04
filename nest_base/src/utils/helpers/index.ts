import { hash, compare } from 'bcrypt';

export const comparePasswords = (
  hash: string,
  password: string,
): Promise<boolean> => {
  return compare(hash, password);
};

export const hashPassword = (password: string): Promise<string> => {
  return hash(password, 10);
};
