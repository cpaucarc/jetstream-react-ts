import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import Banner from '@/Components/Banner';
import Sidebar from '../Components/General/Sidebar';

interface Props {
  title: string;
  renderHeader?(): JSX.Element;
}

export default function AppLayout({
  title,
  renderHeader,
  children,
}: PropsWithChildren<Props>) {
  const MOBILE_WIDTH = 768; // 768px
  const [showFloatSidebar, setShowFloatSidebar] = useState(false);
  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  const showSidebarIcon = useMemo(
    () => screenSize.width < MOBILE_WIDTH,
    [screenSize],
  );

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener('resize', updateDimension);

    if (screenSize.width >= MOBILE_WIDTH) {
      setShowFloatSidebar(false);
    }

    return () => {
      window.removeEventListener('resize', updateDimension);
    };
  }, [screenSize]);

  return (
    <div className="flex min-h-screen max-h-screen overflow-hidden relative">
      {/* Sidebar */}
      <Sidebar
        className={
          !showSidebarIcon
            ? 'flex'
            : showFloatSidebar
            ? 'z-30 flex absolute top-0 left-0 shadow-xl'
            : 'flex absolute -left-64'
        }
        showSidebarIcon={showSidebarIcon}
        showFloatSidebar={showFloatSidebar}
        setShowFloatSidebar={setShowFloatSidebar}
      />
      {showFloatSidebar && (
        <div
          className="z-10 absolute top-0 left-0 bg-gray-800/30 w-full h-full backdrop-blur-sm duration-100 ease-in-out"
          onClick={() => setShowFloatSidebar(false)}
        ></div>
      )}

      {/* <!-- Page Content --> */}
      <main className="flex-1 h-screen overflow-y-auto bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300">
        <Head title={title} />

        <Banner />

        {/* <!-- Page Heading --> */}
        {renderHeader ? (
          <header className="border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-9xl mx-auto py-6 px-6 lg:px-8">
              {renderHeader()}
              {showSidebarIcon && (
                <button onClick={() => setShowFloatSidebar(!showFloatSidebar)}>
                  hola - {showFloatSidebar ? 'activo' : 'inactivo'}
                </button>
              )}
            </div>
          </header>
        ) : null}

        <div className="max-w-9xl mx-auto py-6 px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
