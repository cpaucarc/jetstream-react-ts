import { Link } from '@inertiajs/react';
import React, { PropsWithChildren } from 'react';

interface Props {
  as?: string;
  href?: string;
  onClick?: React.MouseEventHandler;
}

export default function DropdownLink({
  as,
  href,
  onClick,
  children,
}: PropsWithChildren<Props>) {
  const classes =
    'flex items-center gap-x-1 px-4 py-2 text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out';

  return (
    <div>
      {(() => {
        switch (as) {
          case 'button':
            return (
              <button
                type="submit"
                className={`${classes} w-full text-left`}
                onClick={onClick}
              >
                {children}
              </button>
            );
          case 'a':
            return (
              <a href={href} className={classes}>
                {children}
              </a>
            );
          default:
            return (
              <Link href={href || ''} className={classes}>
                {children}
              </Link>
            );
        }
      })()}
    </div>
  );
}
