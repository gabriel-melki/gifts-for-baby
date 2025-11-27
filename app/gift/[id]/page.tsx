import { SheetsService } from '../../../lib/sheets';
import { notFound } from 'next/navigation';
import { t } from '../../../lib/translations';
import GiftForm from '../../components/GiftForm';
import SafeImage from '../../components/SafeImage';
import AutoRedirect from '../../components/AutoRedirect';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: {
    id: string;
  };
}

async function getItem(id: string) {
  const sheetsService = new SheetsService();
  return await sheetsService.getItemById(id);
}

export default async function GiftPage({ params }: PageProps) {
  const item = await getItem(params.id);

  if (!item) {
    notFound();
  }

  if (item.isGifted) {
    return (
      <main className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          {t('backToWishlistShort')}
        </Link>

        <div className="max-w-2xl mx-auto bg-cream-50 border border-cream-200 rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 text-center">
            <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <span className="text-green-600 text-4xl">🎉</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t('itemAlreadyGifted')}
            </h1>
            <p className="text-gray-600 mb-6">
              {t('someoneAlreadyClaimed')}
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              {t('chooseAnotherGift')}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (item.isReserved && !item.isCustomPrice) {
    return (
      <main className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          {t('backToWishlistShort')}
        </Link>

        <div className="max-w-2xl mx-auto bg-cream-50 border border-cream-200 rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 text-center">
            <div className="bg-orange-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <span className="text-orange-600 text-4xl">⏳</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t('itemReserved')}
            </h1>
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              {t('chooseAnotherGift')}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <AutoRedirect itemId={params.id} />
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8"
      >
        <ArrowLeft className="h-5 w-5" />
        {t('backToWishlistShort')}
      </Link>

      <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* Item Details */}
        <div className="bg-cream-50 border border-cream-200 rounded-xl shadow-lg overflow-hidden">
          <SafeImage
            src={item.image}
            alt={item.name}
            width={500}
            height={400}
            className="w-full h-64 object-cover"
            fallbackSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjI1MCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTk5OTkiPkFydGljbGUgY2FkZWF1PC90ZXh0Pjwvc3ZnPg=="
          />
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              {item.name}
            </h1>
            <p className="text-gray-600 mb-4">
              {item.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-primary-600">
                {item.price} €
              </span>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <ExternalLink className="h-5 w-5" />
                  {t('viewItem')}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Gift Form */}
        <div className="bg-cream-50 border border-cream-200 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🎁 {t('giftThisItem')}
          </h2>
          <GiftForm item={item} />
        </div>
      </div>
    </main>
  );
}