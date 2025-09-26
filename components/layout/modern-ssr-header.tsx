import { getNavigationSections } from '@/lib/section-utils';
import { getHeaderData } from '@/lib/actions';
import { ModernHeader } from './modern-header';
export const dynamic = 'force-dynamic';

export async function ModernSSRHeader() {
  const [navigationSections, headerData] = await Promise.all([
    getNavigationSections(),
    getHeaderData()
  ]);
  
  return <ModernHeader 
    navigationSections={navigationSections} 
    headerData={headerData}
  />;
}