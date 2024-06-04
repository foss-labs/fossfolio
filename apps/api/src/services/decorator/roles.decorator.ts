import { SetMetadata } from '@nestjs/common';
import { Role } from '@api/utils/db';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
