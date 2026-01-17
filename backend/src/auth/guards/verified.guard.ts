import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { UserVerificationStatus } from '../../users/entities/user.entity';

@Injectable()
export class VerifiedUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
        // Ensure this guard is used after AuthGuard or check user existence
        return false;
    }

    if (user.verification_status !== UserVerificationStatus.VERIFIED) {
      throw new ForbiddenException('User is not verified. Access restricted.');
    }

    return true;
  }
}
