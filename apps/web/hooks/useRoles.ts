import { useAuth } from "./useAuth";

const Properties = {
  ADMIN: {
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
  EDITOR: {
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
  VIEWER: {
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
  NO_ACCESS: {
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
    return Properties["NO_ACCESS"];
  }
  return Properties[role];
};
