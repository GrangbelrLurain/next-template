import { userStore } from '@/stores/userStore';
import { useCallback, useTransition } from 'react';
import { useAuth } from './useAuth';
import { createUser } from '@/schemas/user';
import Logger from '@/utils/error/errorConvention';

const useUser = () => {
  const { getUserInfo } = useAuth();

  const { users, setUsers } = userStore();

  const [isPending, startTransition] = useTransition();

  const getUser = useCallback(() => {
    startTransition(() => {
      const logger = Logger.group('getUser');
      getUserInfo()
        .then((res) => {
          if (!res) return logger.log(0, 'user not found');
          const user = createUser(res);
          if (!user) return logger.log(3, 'invalid user');
          setUsers(users.concat(user));
        })
        .catch((error) => {
          logger.log(3, error);
        })
        .finally(() => {
          logger.end();
        });
    });
  }, [users, setUsers, getUserInfo]);

  return { user: users[0], getUser, isPending };
};

export default useUser;
