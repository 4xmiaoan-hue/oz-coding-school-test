import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UiSettingsState {
  isReportPreviewVisible: boolean;
  toggleReportPreviewVisibility: () => void;
  setReportPreviewVisibility: (isVisible: boolean) => void;
}

export const useUiSettingsStore = create<UiSettingsState>()(
  persist(
    (set) => ({
      isReportPreviewVisible: false, // Default to hidden as requested
      toggleReportPreviewVisibility: () => set((state) => ({ isReportPreviewVisible: !state.isReportPreviewVisible })),
      setReportPreviewVisibility: (isVisible) => set({ isReportPreviewVisible: isVisible }),
    }),
    {
      name: 'ui-settings-storage', // name of the item in the storage (must be unique)
    }
  )
);
