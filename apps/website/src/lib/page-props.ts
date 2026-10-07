import type { GetServerSideProps } from 'next';
import { getSiteInfo } from '@/services/siteService';
import { SiteInfo } from '@/viewModels/site';

export interface SiteProps {
  site: SiteInfo | null;
}

// Adds the layout's academy data to a page's server-side props.
export async function withSite<P extends object>(
  props: P,
): Promise<P & SiteProps> {
  return { ...props, site: await getSiteInfo() };
}

// getServerSideProps for pages that only need the layout data.
export const getSiteOnlyProps: GetServerSideProps<SiteProps> = async () => ({
  props: await withSite({}),
});
