import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.model';
import { UserService } from 'src/users/users.service';
import { comparePassword, hashPassword } from 'src/utils/passHash';
import { LoginUserDTO } from './auth.model';

export type AuthResult = { accessToken: string; user: UserDTO };
export type UserDTO = Omit<User, 'password'> & { password?: string };

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async authenticate({ email, password }: LoginUserDTO): Promise<AuthResult> {
    const user = await this.validateUser({ email, password });
    if (!user) throw new UnauthorizedException();
    this.toUserDTO(user);
    return this.signIn(user);
  }

  async validateUser({ email, password }: LoginUserDTO) {
    try {
      const user = await this.userService.getByEmail(email, false);
      if (!user) throw new UnauthorizedException();

      const compareResult = await comparePassword(password, user.password);
      this.toUserDTO(user);

      if (user && user.email === email && compareResult) return user;
    } catch {
      throw new UnauthorizedException();
    }
  }

  async signIn(user: UserDTO): Promise<AuthResult> {
    const tokenPayload = user;
    const accessToken = await this.jwtService.signAsync(tokenPayload);
    return { accessToken, user };
  }

  async register(user: User) {
    try {
      const hashedPassword = await hashPassword(user.password);
      user.password = hashedPassword;
      const newUser = await this.userService.create(user);
      if (!newUser) throw new BadRequestException();
      this.toUserDTO(newUser);
      return await this.signIn(newUser);
    } catch {
      throw new BadRequestException();
    }
  }

  toUserDTO(user: User) {
    const u = user as UserDTO;
    delete u.password;
    return u;
  }
}
