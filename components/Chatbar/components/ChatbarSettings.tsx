import {
  IconBook2,
  IconBulbFilled,
  IconFileExport,
  IconSettings,
  IconShieldHalf,
} from '@tabler/icons-react';
import { signOut, useSession } from 'next-auth/react';
import { useContext, useState } from 'react';

import { useTranslation } from 'next-i18next';

import { CODA_LINK, GUIDELINES_LINK, USER_GUIDE_LINK } from '@/utils/app/const';

import HomeContext from '@/pages/api/home/home.context';

import { SettingDialog } from '@/components/Settings/SettingDialog';
import SidebarActionsContainer from '@/components/Sidebar/components/SidebarActionsContainer';
import SignOut from '@/components/Sidebar/components/SignOut';

import { Import } from '../../Settings/Import';
import { Key } from '../../Settings/Key';
import { SidebarButton } from '../../Sidebar/SidebarButton';
import ChatbarContext from '../Chatbar.context';
import { ClearConversations } from './ClearConversations';

export const ChatbarSettings = () => {
  const { t } = useTranslation('sidebar');
  const [isSettingDialogOpen, setIsSettingDialog] = useState<boolean>(false);
  const { data: session } = useSession();

  const {
    state: {
      apiKey,
      lightMode,
      serverSideApiKeyIsSet,
      serverSidePluginKeysSet,
      conversations,
    },
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const {
    handleClearConversations,
    handleImportConversations,
    handleExportData,
    handleApiKeyChange,
  } = useContext(ChatbarContext);

  return (
    <>
      <SidebarActionsContainer>
        {conversations.length > 0 ? (
          <ClearConversations onClearConversations={handleClearConversations} />
        ) : null}

        <Import onImport={handleImportConversations} />

        <SidebarButton
          text={t('Export data')}
          icon={<IconFileExport size={18} />}
          onClick={() => handleExportData()}
        />

        <SidebarButton
          text={t('Settings')}
          icon={<IconSettings size={18} />}
          onClick={() => setIsSettingDialog(true)}
        />

        {!serverSideApiKeyIsSet ? (
          <Key apiKey={apiKey} onApiKeyChange={handleApiKeyChange} />
        ) : null}

        {/*{!serverSidePluginKeysSet ? <PluginKeys /> : null}*/}

        <SettingDialog
          open={isSettingDialogOpen}
          onClose={() => {
            setIsSettingDialog(false);
          }}
        />
      </SidebarActionsContainer>

      <SidebarActionsContainer>
        <SidebarButton
          text={t('Send your Ideas')}
          icon={<IconBulbFilled size={18} />}
          onClick={() => {
            window.open(CODA_LINK, '_blank', 'noreferrer');
          }}
        />
        <SidebarButton
          text={t('Guidelines')}
          icon={<IconShieldHalf size={18} />}
          onClick={() => {
            window.open(GUIDELINES_LINK, '_blank', 'noreferrer');
          }}
        />
        <SidebarButton
          text={t('User guide')}
          icon={<IconBook2 size={18} />}
          onClick={() => {
            window.open(USER_GUIDE_LINK, '_blank', 'noreferrer');
          }}
        />
      </SidebarActionsContainer>

      {session && (
        <SidebarActionsContainer>
          <SignOut signOut={signOut} userName={session.user?.name} />
        </SidebarActionsContainer>
      )}
    </>
  );
};
