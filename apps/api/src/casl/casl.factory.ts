import { OrganizationMember } from '@prisma/client';
import { PureAbility, AbilityBuilder } from '@casl/ability';
import { createPrismaAbility, PrismaQuery, Subjects } from '@casl/prisma';

type AppAbility = PureAbility<
    [
        string,
        Subjects<{
            Member: OrganizationMember;
        }>,
    ],
    PrismaQuery
>;

export const defineAbilityFor = (member: OrganizationMember): AppAbility => {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);
    // Define permissions based on user roles and conditions
    if (member.role === 'ADMIN') {
        // can have access to everything
    } else if (member.role === 'EDITOR') {
        // can have access to everything
        // cannot have accces to delete event or org
    } else if (member.role === 'VIEWER') {
        // can only have read acces to complete system
    }
    const ability = build();
    return ability;
};
