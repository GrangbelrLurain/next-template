import { useState, useEffect } from 'react';
import { dbManager, SharedData, TData } from '@/lib/indexedDB';

export function useSharedData(userId: string, encryptionKey: string) {
  const [sharedData, setSharedData] = useState<SharedData[]>([]);

  const shareData = async (
    data: TData,
    /** shareWithUserId: string to-do: 사용자 공유 기능*/
  ) => {
    await dbManager.addData(data, userId, encryptionKey);
    await refreshData();
  };

  const refreshData = async () => {
    const allData = await dbManager.getAllData();
    setSharedData(
      allData.filter((item) => item.ownerId === userId || item.sharedWith.includes(userId)),
    );
  };

  useEffect(() => {
    refreshData();
  }, [userId]);

  return { sharedData, shareData };
}
