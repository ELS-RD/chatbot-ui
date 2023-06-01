import { ReactNode } from 'react';

import { DefaultTFuncReturn } from 'i18next';

type ChatInfoProps = {
  role: 'alert' | 'contentInfo';
  icon: JSX.Element;
  children: ReactNode;
  color: string;
  title?: DefaultTFuncReturn;
};
const ChatInfo = ({ role, icon, children, color, title }: ChatInfoProps) => {
  return (
    <div
      className={`inline-flex items-start w-full p-4 rounded-lg bg-transparent border-2 ${color} text-neutral-900 dark:${color} dark:text-neutral-100`}
      role={role}
    >
      <span className="mr-2">{icon}</span>
      <div>
        {title && <h3 className="font-medium pt-0.5 pb-2">{title}</h3>}
        <div className="space-y-2 leading-relaxed text-black/50 dark:text-white/50">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ChatInfo;
