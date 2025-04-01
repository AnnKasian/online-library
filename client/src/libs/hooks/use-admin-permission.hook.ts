import { useAuth } from '#/api/users';
import { UserRole } from '#/services/users';

const useAdminPermission = () => {
  const { data } = useAuth();

  return data?.role === UserRole.ADMIN;
};

export { useAdminPermission };
