import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { SiteSettings } from '@/types';

const defaultSettings: SiteSettings = {
  siteName: 'Zetu Zetu Form',
  tagline: 'The New Breed Initiative',
  location: 'Langas, Eldoret, Kenya',
  logoUrl: '',
  heroImageUrl: '',
  social: {
    instagram: 'https://instagram.com/zetuzetuform',
    tiktok: 'https://tiktok.com/@zetuzetuform',
    youtube: 'https://youtube.com/@zetuzetuform',
    whatsapp: 'https://wa.me/254700000000',
    facebook: 'https://facebook.com/zetuzetuform',
    twitter: 'https://twitter.com/zetuzetuform',
  },
  pesapalMerchantUrl: '',
  contactEmail: 'hello@zetuzetuform.org',
  contactPhone: '+254 700 000 000',
};

interface SettingsContextValue {
  settings: SiteSettings;
  loading: boolean;
}

const SettingsContext = createContext<SettingsContextValue>({
  settings: defaultSettings,
  loading: true,
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/settings.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load settings');
        return res.json();
      })
      .then((data: SiteSettings) => {
        setSettings({
          ...defaultSettings,
          ...data,
          social: { ...defaultSettings.social, ...data.social },
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
