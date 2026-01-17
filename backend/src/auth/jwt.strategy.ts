import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'superSecretKey', // Use ENV in production
    });
  }

  async validate(payload: any) {
    // Payload usually contains sub (id) and email
    // We fetch the user to get latest status
    const user = await this.usersService.findOne(payload.sub);
    if (!user) {
        throw new UnauthorizedException();
    }
    return user; // Creates request.user
  }
}
