'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';

const Parallel = ({ children }: { children: React.ReactNode }) => {
  const [isRender, setIsRender] = useState(false);
  useEffect(() => {
    setIsRender(true);
  }, []);
  return (
    <div
      className={clsx(
        'fixed left-0 top-0 h-screen w-screen transition-transform duration-500',
        isRender ? 'translate-x-full' : 'translate-x-0',
      )}
    >
      {children}
    </div>
  );
};

export default Parallel;
