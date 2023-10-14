import { useAuth } from './useAuth';

export const useRoles = (): boolean => {
    const { user } = useAuth();

    const haveAccess = false;

    /* 
    ADMIN
  
     * only admins can delete the org
     * can send invite to others
     * inherits all the features of both editor and viewer
     * can only create event

    EDITOR

     * can edit the event info 
     * inherits all the features  of viewers

    VIEWER
      * have access to admin dashboard
      * have access to change the participants status
 
     */
    return haveAccess;
};
