import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

interface FeatureFlagStore {
  flags: FeatureFlag[];
  addFlag: (flag: Omit<FeatureFlag, 'id'>) => void;
  toggleFlag: (id: string) => void;
  removeFlag: (id: string) => void;
  getActiveFlags: () => FeatureFlag[];
  getInactiveFlags: () => FeatureFlag[];
}

const initialFlags: FeatureFlag[] = [
  {
    id: 'new-dashboard',
    name: 'New Dashboard',
    description: 'Enables the new dashboard layout for all users.',
    isActive: true,
  },
  {
    id: 'beta-feature-access',
    name: 'Beta Feature Access',
    description: 'Grants access to beta features for testing purposes.',
    isActive: false,
  },
  {
    id: 'dark-mode',
    name: 'Dark Mode',
    description: 'Allows users to switch to dark mode theme.',
    isActive: true,
  },
  {
    id: 'enhanced-security',
    name: 'Enhanced Security',
    description: 'Activates additional security measures for user accounts.',
    isActive: false,
  },
  {
    id: 'performance-improvements',
    name: 'Performance Improvements',
    description: 'Optimizes application performance for better user experience.',
    isActive: true,
  },
  {
    id: 'social-media-integration',
    name: 'Social Media Integration',
    description: 'Enables sharing content directly to social media platforms.',
    isActive: false,
  },
  {
    id: 'multi-language-support',
    name: 'Multi-language Support',
    description: 'Provides support for multiple languages in the UI.',
    isActive: true,
  },
];

export const useFeatureFlagStore = create<FeatureFlagStore>()(
  persist(
    (set, get) => ({
      flags: initialFlags,

      addFlag: (flagData) => {
        const newFlag: FeatureFlag = {
          ...flagData,
          id: flagData.name.toLowerCase().replace(/\s+/g, '-'),
        };
        set((state) => ({
          flags: [...state.flags, newFlag],
        }));
      },

      toggleFlag: (id) => {
        set((state) => ({
          flags: state.flags.map((flag) =>
            flag.id === id ? { ...flag, isActive: !flag.isActive } : flag
          ),
        }));
      },

      removeFlag: (id) => {
        set((state) => ({
          flags: state.flags.filter((flag) => flag.id !== id),
        }));
      },

      getActiveFlags: () => {
        return get().flags.filter((flag) => flag.isActive);
      },

      getInactiveFlags: () => {
        return get().flags.filter((flag) => !flag.isActive);
      },
    }),
    {
      name: 'feature-flag-storage',
    }
  )
);