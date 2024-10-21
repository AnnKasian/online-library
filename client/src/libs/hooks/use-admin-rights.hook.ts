import { UserRole } from '#/services/users';

import { useAppSelector } from './use-app-selector.hook';

const useAdminRights = () => {
  const role = useAppSelector(({ users }) => users.user?.role);

  return role === UserRole.ADMIN;
};

export { useAdminRights };
