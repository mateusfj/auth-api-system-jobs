import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtInterface } from 'src/domain/@shared/jwt/jwt.auth.interface';

@Injectable()
export class JwtAuth implements IJwtInterface {
  constructor(private jwtService: JwtService) {}

  async sign(
    payload: object,

    options: object,
  ): Promise<string> {
    const token = await this.jwtService.signAsync(
      { ...payload },
      {
        ...options,
      },
    );
    return token;
  }

  verify(token: string): any {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET_KEY,
    });
  }
}
