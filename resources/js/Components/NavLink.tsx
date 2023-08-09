import { Link } from '@inertiajs/react';
import React, { PropsWithChildren } from 'react';

interface Props {
  href: string;
  active?: boolean;
}

export default function NavLink({
  active,
  href,
  children,
}: PropsWithChildren<Props>) {
  const classes = active
    ? 'text-black dark:text-white font-bold bg-gray-200 dark:bg-gray-950'
    : 'text-gray-600 dark:text-gray-500 dark:hover:text-gray-400 font-medium bg-transparent hover:bg-gray-200 dark:hover:bg-gray-950/80';

  return (
    <Link
      href={href}
      className={`flex text-sm items-center px-3 py-2 rounded-lg ease-in-out duration-150 ${classes}`}
    >
      {children}
    </Link>
  );
}
