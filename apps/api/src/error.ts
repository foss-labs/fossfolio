export const ORG_EXISTS = {
    ok: false,
    message: 'An organization with that slug already exists',
    error: 'ORG_EXISTS',
};
export const ORG_NOT_FOUND = {
    ok: false,
    message: 'An organization with that slug does not exist',
    error: 'ORG_NOT_FOUND',
};

export const ORG_MEMBER_NOT_FOUND = {
    ok: false,
    message: 'An organization member with that user id does not exist',
    error: 'ORG_MEMBER_NOT_FOUND',
};

export const ROLE_UPDATE_FAILED = {
    ok: false,
    message: 'Failed to update role',
    error: 'ROLE_UPDATE_FAILED',
};

export const USER_NOT_FOUND = {
    ok: false,
    message: 'User Doesnt Exist',
    error: 'USER_NOT_FOUND',
};

export const USER_UPDATE_ERROR = {
    ok: false,
    message: 'Cant Update User',
    error: 'USER_UPDATE_ERROR',
};

export const ORG_ID_NOT_FOUND = {
    ok: false,
    message: "couldn't find the org",
    error: 'please provide an organizationId',
};

export const NO_ROLE_ACCESS = {
    ok: false,
    message: 'you are not authorized to visit the page',
    error: 'insufficent role access',
};
