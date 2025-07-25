import * as bcrypt from 'bcrypt';

export function hashPassword(password: string) {
  console.log('llllll', password);
  return bcrypt.hash(password, 10);
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
