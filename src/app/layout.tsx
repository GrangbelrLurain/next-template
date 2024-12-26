'use client';

import initMSW from '@/utils/serviceWorkers/msw';
import '@/styles/globals.css';
import useUser from '@/hooks/useUser';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useMemo } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';
import { MdMenu } from 'react-icons/md';
import clsx from 'clsx';

const Layout = ({ children, layer }: { children: React.ReactNode; layer: React.ReactNode }) => {
  useEffect(() => {
    initMSW();
  }, []);

  const parallelPage = useMemo(() => {
    return layer || null;
  }, [layer]);

  const { user } = useUser();

  const { signInWithGoogle, signOutWithGoogle } = useAuth();

  return (
    <html lang="ko">
      <body>
        {parallelPage}
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col min-h-screen h-max">
            <header className="fixed left-0 top-0 w-full py-2">
              <div className="w-full px-2 flex justify-between items-center pointer-events-none">
                <label className="btn btn-sm btn-square pointer-events-auto" htmlFor="my-drawer">
                  <MdMenu size="20px" />
                </label>
                {user ? (
                  <div className="flex items-center gap-2 pointer-events-auto">
                    <button
                      className={clsx(
                        'bg-slate-900 py-1 px-4 rounded-full max-w-max flex items-center gap-1 whitespace-nowrap',
                        'text-sm font-bold',
                      )}
                      onClick={signOutWithGoogle}
                    >
                      <span>Sign-Out</span>
                      <FcGoogle size="16px" />
                    </button>
                    <p className="text-xs">
                      {user?.name} ({user?.email})
                    </p>
                    <Image
                      src={user?.profileImage}
                      alt="profile"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  </div>
                ) : (
                  <button className="pointer-events-auto btn btn-sm" onClick={signInWithGoogle}>
                    <FcGoogle size="16px" />
                    <span>Sign-In</span>
                  </button>
                )}
              </div>
            </header>
            <main className="grow">{children}</main>
            <footer className="footer shrink-0" />
          </div>
          <nav className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay" />
            <ul className="menu">
              <li />
            </ul>
          </nav>
        </div>
      </body>
    </html>
  );
};

export default Layout;
