import setupGhostApi from '../utils/api';
import { AnnouncementBar } from './announcement-bar';
import { useEffect, useRef, useState } from 'preact/hooks';
import type { AnnouncementSettings } from '../utils/api';

type MainProps = {
  apiUrl?: string;
};

export function Main({ apiUrl }: MainProps) {
  const api = useRef(setupGhostApi({ apiUrl }));
  const [siteSettings, setSiteSettings] = useState<AnnouncementSettings>();

  useEffect(() => {
    if (siteSettings) {
      return;
    }
    const getSiteSettings = async () => {
      try {
        const announcement = await api.current.init();

        setSiteSettings(announcement);
      } catch {
        // Keep the bar hidden rather than surfacing the error on the site
      }
    };

    void getSiteSettings();
    // We only do this for init
  }, []);

  return <AnnouncementBar settings={siteSettings} />;
}
