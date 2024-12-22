import { useAuth } from '@/hooks/useAuth';
import useUser from '@/hooks/useUser';
import { useEffect } from 'react';

function SomeContainer() {
  const { signInWithGoogle } = useAuth();

  const handleShare = async () => {
    signInWithGoogle();
  };

  const { getUser, isPending, user } = useUser();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="pt-40 max-w-screen-sm mx-auto">
      {isPending ? (
        <div>Loading...</div>
      ) : user ? (
        <div>안녕하세요 {user.name}님, 오늘도 즐거운 하루 되세요!</div>
      ) : (
        <button onClick={() => handleShare()}>Sign In with Google</button>
      )}
    </div>
  );
}

export default SomeContainer;
