import { userStore } from '@/stores/userStore';
import { useCallback, useTransition } from 'react';
import { useAuth } from './useAuth';
import { createUser } from '@/schemas/user';

const useUser = () => {
  const { getUserInfo } = useAuth();

  const { users, setUsers } = userStore();

  const [isPending, startTransition] = useTransition();

  const getUser = useCallback(() => {
    startTransition(async () => {
      try {
        const res = await getUserInfo();
        if (!res) throw new Error('user not found');
        console.log(res);
        const user = createUser(res);
        if (!user) throw new Error('invalid user');
        setUsers(users.concat(user));
      } catch (error) {
        console.error(error);
      }
    });
  }, [users, setUsers, getUserInfo]);

  return { user: users[0], getUser, isPending };
};

export default useUser;
