import { useAuth } from "./useAuth";

const Properties = {
  admin: {
    canDeleteOrg: true,
    canSendInvite: true,
    canCreateEvent: true,
    canEditEvent: true,
    canRemoveOrgUser: true,
    canViewDashboard: true,
    canChangeParticipantStatus: true,
    canSeeRevenue: true,
    canDeleteEvent: true,
    canEditOrg: true,
  },
  editor: {
    canDeleteOrg: false,
    canEditEvent: true,
    canCreateEvent: true,
    canViewDashboard: true,
    canSendInvite: false,
    canRemoveOrgUser: false,
    canChangeParticipantStatus: true,
    canSeeRevenue: false,
    canDeleteEvent: false,
    canEditOrg: false,
  },
  viewer: {
    canDeleteOrg: false,
    canEditEvent: false,
    canCreateEvent: false,
    canSendInvite: false,
    canRemoveOrgUser: false,
    canViewDashboard: true,
    canChangeParticipantStatus: true,
    canSeeRevenue: false,
    canDeleteEvent: false,
    canEditOrg: false,
  },
  no_access: {
    canDeleteOrg: false,
    canEditEvent: false,
    canCreateEvent: false,
    canSendInvite: false,
    canRemoveOrgUser: false,
    canViewDashboard: true,
    canChangeParticipantStatus: false,
    canSeeRevenue: false,
    canDeleteEvent: false,
    canEditOrg: false,
  },
};

export const useRoles = () => {
  const { role } = useAuth();

  if (!role) {
    return Properties["no_access"];
  }
  return Properties[role];
};
