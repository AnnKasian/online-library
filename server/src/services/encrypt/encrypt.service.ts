import bcrypt from 'bcryptjs';

class EncryptService {
  static generateSalt(rounds: number): Promise<string> {
    return bcrypt.genSalt(rounds);
  }

  static generateHash(data: string, salt: string): Promise<string> {
    return bcrypt.hash(data, salt);
  }

  static compare(data: string, hash: string): Promise<boolean> {
    return bcrypt.compare(data, hash);
  }
}

export { EncryptService };
