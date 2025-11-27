import { SheetsService } from '../lib/sheets';
import { env } from '../lib/env';
import { t } from '../lib/translations';
import WishlistGrid from './components/WishlistGrid';
import { Gift, Heart } from 'lucide-react';

export const revalidate = 0; // Always revalidate for fresh data

async function getWishlistItems() {
  const sheetsService = new SheetsService();
  return await sheetsService.getWishlistItems();
}

export default async function Home() {
  const items = await getWishlistItems();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Gift className="h-8 w-8 text-primary-600" />
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900" style={{fontFamily: env.titleFont}}>{env.pageTitle}</h1>
          <Heart className="h-8 w-8 text-red-500" />
        </div>
      </div>

      <WishlistGrid items={items} />

      <div className="mt-16 text-center">
        <div className="bg-cream-50 border border-cream-200 rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('howItWorks')}</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="text-center">
              <div className="bg-cream-200 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <span className="text-primary-700 font-bold">1</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">{t('browseAndChoose')}</h3>
              <p className="text-sm text-gray-600">{t('browseDescription')}</p>
            </div>
            <div className="text-center">
              <div className="bg-cream-200 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <span className="text-primary-700 font-bold">2</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">{t('claimTheGift')}</h3>
              <p className="text-sm text-gray-600">{t('claimDescription')}</p>
            </div>
            <div className="text-center">
              <div className="bg-cream-200 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <span className="text-primary-700 font-bold">3</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">{t('sendViaRevolut')}</h3>
              <p className="text-sm text-gray-600">{t('sendDescription')}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}