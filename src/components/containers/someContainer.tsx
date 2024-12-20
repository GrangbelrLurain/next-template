import { useSharedData } from '@/hooks/useSharedData';

function SomeContainer() {
  const userId = 'user123'; // 실제로는 인증 시스템에서 가져옴
  const { shareData } = useSharedData(userId, 'encryptionKey');

  const handleShare = async () =>
    /** targetUserId: string to-do: 사용자 공유 기능*/
    {
      await shareData(
        {
          message: 'Hello!',
          timestamp: new Date(),
        },
        /** targetUserId: string to-do: 사용자 공유 기능*/
      );
    };

  return (
    <div>
      <button
        onClick={
          () => handleShare()
          /** targetUserId: string to-do: 사용자 공유 기능*/
          // 'user456'
        }
      >
        Share with User
      </button>
    </div>
  );
}

export default SomeContainer;
