import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserGrpcClient } from 'src/modules/grpc/user-grpc.client';
import { lastValueFrom } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { isNull } from 'util';
import { User } from 'src/modules/auth/dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userGrpc: UserGrpcClient,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await lastValueFrom(this.userGrpc.GetUserByEmail({ email }));
    if (!user) {
      throw new BadRequestException('user not found');
    }
    const checkPassword = await lastValueFrom(
      this.userGrpc.checkPassword({ password, email }),
    );

    if (!checkPassword.check) {
      throw new RpcException({
        statusCode: 400,
        message: 'your password is in correct',
      });
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await lastValueFrom(this.userGrpc.GetUserByEmail({ email }));
    if (!user) {
      return null;
    }
    const checkPassword = await lastValueFrom(
      this.userGrpc.checkPassword({ password: pass, email }),
    );

    if (!checkPassword.check) {
      throw new RpcException({
        statusCode: 400,
        message: 'your password is in correct',
      });
    }
    return user;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
