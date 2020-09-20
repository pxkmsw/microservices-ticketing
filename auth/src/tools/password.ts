import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
  static hash = async (pass: string) => {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(pass, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
  };

  static compare = async (storedPass: string, suppliedPass: string) => {
    const [hashedPass, salt] = storedPass.split('.');
    const buf = (await scryptAsync(suppliedPass, salt, 64)) as Buffer;

    return buf.toString('hex') === hashedPass;
  };
}
