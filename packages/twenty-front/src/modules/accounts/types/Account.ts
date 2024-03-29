import { InboxSettingsVisibilityValue } from '@/settings/accounts/components/SettingsAccountsInboxSettingsVisibilitySection';

export type Account = {
  id: string;
  handle: string;
  isContactAutoCreationEnabled?: boolean;
  isSynced?: boolean;
  visibility: InboxSettingsVisibilityValue;
};
