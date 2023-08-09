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
import {
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  SunIcon,
  MoonIcon,
  ChevronLeftIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';

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
            className="absolute border-l border-gray-200 dark:border-gray-700 w-5 h-5 -right-5 top-1 grid place-items-center rounded-r bg-gray-200 dark:bg-gray-900 text-gray-600 dark:text-gray-300 shadow"
            onClick={() => setShowFloatSidebar(!showFloatSidebar)}
          >
            <ChevronLeftIcon
              className={`w-4 h-4 ${showFloatSidebar ? '' : 'rotate-180'}`}
            />
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
                  <EllipsisHorizontalIcon className="w-5 h-5" />
                </button>
              )}
            >
              {/* <!-- Account Management --> */}
              <div className="block px-4 py-2 text-sm text-gray-500">
                Manage Account
              </div>

              <DropdownLink href={route('profile.show')}>
                <UserCircleIcon className="w-5 h-5" />
                Profile
              </DropdownLink>

              <DropdownLink
                href={route('profile.show')}
                as="button"
                onClick={switchTheme}
              >
                {theme === DARK_THEME ? (
                  <SunIcon className="w-5 h-5" />
                ) : (
                  <MoonIcon className="w-5 h-5" />
                )}
                Swith theme
              </DropdownLink>

              <div className="border-t border-gray-200 dark:border-gray-600"></div>

              {/* <!-- Authentication --> */}
              <form onSubmit={logout}>
                <DropdownLink as="button">
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
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
