'use client';

import { useState } from 'react';
import { WishlistItem } from '../../lib/sheets';
import { env } from '../../lib/env';
import { t } from '../../lib/translations';
import { ExternalLink, Loader2, Mail } from 'lucide-react';

interface GiftFormProps {
  item: WishlistItem;
}

export default function GiftForm({ item }: GiftFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    email: '',
    customPrice: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const revolutLink = env.revolutLink;


  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError(t('pleaseEnterName'));
      return;
    }

    if (!formData.email.trim()) {
      setError(t('pleaseEnterEmail'));
      return;
    }

    if (!validateEmail(formData.email.trim())) {
      setError(t('invalidEmail'));
      return;
    }

    if (item.isCustomPrice) {
      if (!formData.customPrice.trim()) {
        setError(t('pleaseEnterAmount'));
        return;
      }
      
      const amount = parseFloat(formData.customPrice.trim());
      if (isNaN(amount) || amount <= 0) {
        setError(t('invalidAmount'));
        return;
      }
    }

    setIsSubmitting(true);
    setError('');

    // Open Revolut immediately (before async operations) to avoid popup blocking
    const revolutWindow = window.open('', '_blank');

    try {
      // Reserve the item and send email
      const reserveData = {
        itemId: item.id,
        name: formData.name.trim(),
        message: formData.message.trim(),
        email: formData.email.trim(),
        customPrice: item.isCustomPrice ? formData.customPrice.trim() : undefined,
      };
      
      const response = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reserveData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // Close the blank window if there's an error
        if (revolutWindow) revolutWindow.close();
        throw new Error(errorData.error || 'Failed to process reservation');
      }

      // Store reservation data
      localStorage.setItem('reservedGift', JSON.stringify({
        itemId: item.id,
        name: formData.name.trim(),
        email: formData.email.trim(),
        timestamp: Date.now()
      }));

      // Now redirect the opened window to Revolut
      if (revolutWindow) {
        revolutWindow.location.href = revolutLink;
      }
      
      setIsSubmitted(true);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : t('failedToProcess'));
      setIsSubmitting(false);
    }
  };


  if (isSubmitted) {
    return (
      <div className="text-center space-y-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center justify-center mb-4">
            <Mail className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-green-800 mb-2">
            {t('emailSent')}
          </h3>
          <p className="text-green-700 text-sm">
            {t('itemReservedSuccess')}
          </p>
        </div>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          {t('backToWishlist')}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          {t('yourNameRequired')}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 border border-cream-300 bg-white text-gray-900 placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder={t('enterFullName')}
          autoComplete="name"
          autoCapitalize="words"
          spellCheck="false"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          {t('email')}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 border border-cream-300 bg-white text-gray-900 placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder={t('enterEmail')}
          autoComplete="email"
          required
        />
      </div>

      {item.isCustomPrice && (
        <div>
          <label htmlFor="customPrice" className="block text-sm font-medium text-gray-700 mb-2">
            {t('customPrice')}
          </label>
          <div className="relative">
            <input
              type="number"
              id="customPrice"
              name="customPrice"
              value={formData.customPrice}
              onChange={(e) => setFormData({ ...formData, customPrice: e.target.value })}
              className="w-full pl-8 pr-4 py-3 border border-cream-300 bg-white text-gray-900 placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 no-spinner"
              placeholder={t('enterAmount')}
              min="1"
              step="0.01"
              required
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">€</span>
            </div>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          {t('message')}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 border border-cream-300 bg-white text-gray-900 placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder={t('messageDescription')}
          autoComplete="off"
          spellCheck="true"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800 text-sm">
          {t('paymentInstructions')}
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            {t('processing')}
          </>
        ) : (
          <>
            <Mail className="h-5 w-5" />
            {t('payForGift')}
          </>
        )}
      </button>
    </form>
  );
}