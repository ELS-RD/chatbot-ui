import { ReactNode } from 'react';

type SidebarActionsContainerProps = {
  children?: ReactNode;
};
const SidebarActionsContainer = ({
  children,
}: SidebarActionsContainerProps) => {
  return (
    <div className="flex flex-col w-full pt-1 space-y-0 items-center border-t border-white/20 text-sm">
      {children}
    </div>
  );
};
export default SidebarActionsContainer;
