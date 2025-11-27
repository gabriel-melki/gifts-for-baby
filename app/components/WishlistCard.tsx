'use client';

import { useState } from 'react';
import { WishlistItem } from '../../lib/sheets';
import { t } from '../../lib/translations';
import { ExternalLink, Gift, Check, Clock } from 'lucide-react';
import Link from 'next/link';
import SafeImage from './SafeImage';
import ImageModal from './ImageModal';

interface WishlistCardProps {
  item: WishlistItem;
}

export default function WishlistCard({ item }: WishlistCardProps) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  return (
    <>
      <div className="bg-cream-50 border border-cream-200 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-xl h-full flex flex-col">
        <div className="relative">
          <SafeImage
            src={item.image}
            alt={item.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setIsImageModalOpen(true)}
          />
          {item.isGifted && (
            <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <Check className="h-4 w-4" />
              {t('alreadyGifted')}
            </div>
          )}
          {!item.isGifted && item.isReserved && !item.isCustomPrice && (
            <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {t('reserved')}
            </div>
          )}
          {item.isCustomPrice && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 shadow-lg">
              <span className="text-sm"></span>
              {t('customAmount')}
            </div>
          )}
        </div>
      
      <div className="p-6 flex flex-col h-full">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {item.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {item.description}
        </p>
        
        <div className="mt-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary-600">
              {item.price} €
            </span>
          </div>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 transition-colors"
              title="View item"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
        </div>

        {item.isGifted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-medium text-center">
              {t('thisItemGifted')}
            </p>
          </div>
        ) : item.isReserved && !item.isCustomPrice ? (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-orange-800 font-medium text-center">
              {t('itemReserved')}
            </p>
          </div>
        ) : (
          <Link
            href={`/gift/${item.id}`}
            className={`block w-full font-medium py-3 px-4 rounded-lg transition-all text-center ${
              item.isCustomPrice 
                ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-primary-600 hover:bg-primary-700 text-white'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Gift className="h-5 w-5" />
              {item.isCustomPrice ? t('iWantToContribute') : t('iWantToGiftThis')}
            </div>
          </Link>
        )}
        </div>
      </div>
    </div>
    
    <ImageModal
      src={item.image}
      alt={item.name}
      isOpen={isImageModalOpen}
      onClose={() => setIsImageModalOpen(false)}
    />
    </>
  );
}