import { IconUserCircle } from '@tabler/icons-react';

import { useTranslation } from 'next-i18next';

type SignOutProps = {
  userName?: string | null;
  signOut: () => void;
};

const SignOut = ({ userName, signOut }: SignOutProps) => {
  const { t } = useTranslation('sidebar');

  return (
    <>
      {userName && (
        <div className="flex w-full items-center gap-3 rounded-md py-3 px-3 text-[14px] leading-3 text-white">
          <div>
            <IconUserCircle size={18} />
          </div>
          <span>{userName}</span>
        </div>
      )}
      <button
        type="button"
        className="
        w-full
        px-4 py-2 mt-6
        border rounded-lg shadow border-neutral-500
        text-white hover:bg-neutral-100 focus:outline-none hover:text-black
        dark:border-neutral-800 dark:border-opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-300"
        onClick={signOut}
      >
        {t('Sign out') || 'Sign out'}
      </button>
    </>
  );
};

export default SignOut;
