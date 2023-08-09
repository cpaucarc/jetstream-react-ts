import React, { useEffect } from 'react';
import { router } from '@inertiajs/core';
import { Link } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import useUiAvatar from '@/Hooks/useUiAvatar';
import { useThemeStore } from '@/Store/themeStore';
import { DARK_THEME } from '@/Types/theme.d';
import ApplicationMark from '@/Components/ApplicationMark';
import NavLink from '@/Components/NavLink';
import Dropdown from '@/Components/Dropdown';
import DropdownLink from '@/Components/DropdownLink';

interface Props {
  className: string;
  showSidebarIcon: boolean;
  showFloatSidebar: boolean;
  setShowFloatSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({
  className,
  showSidebarIcon,
  showFloatSidebar,
  setShowFloatSidebar,
}: Props) {
  const route = useRoute();
  const page = useTypedPage();
  const { generateAvatarURI } = useUiAvatar();

  const theme = useThemeStore(state => state.theme);
  const switchTheme = useThemeStore(state => state.switchTheme);

  const avatarUrl = page.props.auth.user?.profile_photo_path
    ? page.props.auth.user?.profile_photo_url
    : generateAvatarURI(page.props.auth.user?.name || 'nd');

  useEffect(() => {
    console.log('fondo', theme);

    if (theme === DARK_THEME) {
      document.documentElement.classList.add(DARK_THEME);
    } else {
      document.documentElement.classList.remove(DARK_THEME);
    }
  }, [theme]);

  function logout(e: React.FormEvent) {
    e.preventDefault();
    router.post(route('logout'));
  }

  return (
    <section
      className={
        'border-r border-gray-200 dark:border-gray-700 flex-shrink-0 w-64 flex-col justify-between h-screen bg-gray-50 dark:bg-gray-900 duration-150 ease-in-out ' +
        className
      }
    >
      <div className="relative py-5 px-4 h-auto flex-shrink-0 font-bold text-lg border-b border-gray-200 dark:border-gray-700">
        <Link
          href={route('dashboard')}
          className="flex items-center gap-x-2 text-black dark:text-gray-300"
        >
          <ApplicationMark className="block h-8 w-auto" />
          Laravel + React
        </Link>

        {showSidebarIcon && (
          <button
            className="absolute border-l border-gray-200 dark:border-gray-700 w-5 h-5 -right-6 top-1 grid place-items-center rounded-r bg-gray-200 dark:bg-gray-900 text-gray-600 dark:text-gray-300 shadow"
            onClick={() => setShowFloatSidebar(!showFloatSidebar)}
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={`w-4 h-4 ${showFloatSidebar ? '' : 'rotate-180'}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        )}
      </div>

      {/* <!-- Navigation Links --> */}
      <div className="py-5 px-4 overflow-y-auto flex-1">
        <div className="flex flex-col space-y-2">
          <NavLink
            href={route('dashboard')}
            active={route().current('dashboard')}
          >
            Dashboard
          </NavLink>

          <NavLink
            href={route('users.index')}
            active={route().current('users.*')}
          >
            Users
          </NavLink>
        </div>
      </div>

      <div className="py-5 px-4 h-auto flex-shrink-0 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between px-3 py-2 border border-transparent mt1 text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-x-2">
            <img
              className="w-9 h-9 rounded-full"
              src={avatarUrl}
              alt="Avatar"
            />
            <div className="flex flex-col mt-1 text-sm leading-4">
              <p className="font-bold">{page.props.auth.user?.name}</p>
              <p className="">{page.props.auth.user?.email}</p>
            </div>
          </div>

          <div className="relative">
            <Dropdown
              align="bottom_left"
              width="48"
              renderTrigger={() => (
                <button className="px-1 hover:text-gray-800 dark:hover:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                </button>
              )}
            >
              {/* <!-- Account Management --> */}
              <div className="block px-4 py-2 text-sm text-gray-500">
                Manage Account
              </div>

              <DropdownLink href={route('profile.show')}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Profile
              </DropdownLink>

              <DropdownLink
                href={route('profile.show')}
                as="button"
                onClick={switchTheme}
              >
                {theme === DARK_THEME ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                    />
                  </svg>
                )}
                Swith theme
              </DropdownLink>

              <div className="border-t border-gray-200 dark:border-gray-600"></div>

              {/* <!-- Authentication --> */}
              <form onSubmit={logout}>
                <DropdownLink as="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                  Log Out
                </DropdownLink>
              </form>
            </Dropdown>
          </div>
        </div>
      </div>
    </section>
  );
}
