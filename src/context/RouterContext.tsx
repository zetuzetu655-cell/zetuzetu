import { createContext, useContext, useState, type ReactNode } from 'react';
import type { PageKey } from '@/types';

interface RouterContextValue {
  page: PageKey;
  navigate: (page: PageKey) => void;
  navigateToFeed: () => void;
}

const RouterContext = createContext<RouterContextValue>({
  page: 'home',
  navigate: () => {},
  navigateToFeed: () => {},
});

export function RouterProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<PageKey>(() => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    const valid: PageKey[] = ['home', 'programs', 'impact', 'media', 'store', 'volunteer', 'contacts'];
    return (valid.includes(hash as PageKey) ? hash : 'home') as PageKey;
  });

  const navigate = (target: PageKey) => {
    setPage(target);
    window.location.hash = `/${target}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToFeed = () => {
    setPage('home');
    window.location.hash = '/home';
    setTimeout(() => {
      const feed = document.getElementById('news-feed');
      if (feed) {
        feed.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <RouterContext.Provider value={{ page, navigate, navigateToFeed }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}
