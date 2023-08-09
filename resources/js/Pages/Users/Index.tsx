import React from 'react';
import AppLayout from '@/Layouts/AppLayout';

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: Date | null;
  two_factor_confirmed_at: Date | null;
  current_team_id: null;
  profile_photo_path: null;
  created_at: Date;
  updated_at: Date;
  profile_photo_url: string;
}

interface Props {
  users: User[];
}

export default function UserIndex({ users }: Props) {
  return (
    <AppLayout
      title="Users"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Users
        </h2>
      )}
    >
      <div className="">
        <div className="">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg ">
            <h2 className="text-3xl mb-6 flex items-end gap-x-2">
              List of users
              <p className="text-sm">({users.length} users founded)</p>
            </h2>
            <div className="space-y-5">
              {users.map(user => (
                <div
                  key={user.id}
                  className="bg-gray-700 dark:bg-gray-300 text-white dark:text-black p-4 rounded-l"
                >
                  {user.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
