import { createContext, useContext } from 'react';
import { SiteInfo } from '@/viewModels/site';

const SiteContext = createContext<SiteInfo | null>(null);

export const SiteProvider = SiteContext.Provider;

// Null on pages without getServerSideProps (e.g. the 404 page); render fallbacks then.
export function useSite(): SiteInfo | null {
  return useContext(SiteContext);
}
