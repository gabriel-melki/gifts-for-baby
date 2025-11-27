import { env } from './env';

// =============================================================================
// TRANSLATIONS - Easy to Edit Copy
// =============================================================================
// This file contains all the text that appears on your gift list website.
// To change any text, simply edit the values in quotes.
// 
// ENGLISH is the default language.
// FRENCH translations are provided below for bilingual support.
// =============================================================================

export const translations = {
  en: {
    // =========================================================================
    // 🏠 HOME PAGE
    // =========================================================================
    
    // Main sections
    howItWorks: 'How it works',
    browseAndChoose: 'Browse & Choose',
    browseDescription: 'Look through the gift registry and find something you\'d like to give',
    claimTheGift: 'Claim the Gift',
    claimDescription: 'Click "I want to gift this" and fill out the simple form',
    sendViaRevolut: 'Send via Revolut',
    sendDescription: 'Use the provided Revolut link to send the gift money',
    
    // =========================================================================
    // 🎁 GIFT CARDS & BUTTONS
    // =========================================================================
    
    alreadyGifted: 'Already gifted',
    reserved: 'Reserved',
    giftedBy: 'Gifted by',
    reservedBy: 'Reserved by',
    iWantToGiftThis: 'I want to gift this',
    iWantToContribute: 'Contribute',
    customAmount: 'Libre €',
    contributionsMade: 'contributions made',
    enterAmount: 'Enter your contribution amount',
    customPrice: 'Custom Price *',
    pleaseEnterAmount: 'Please enter an amount',
    invalidAmount: 'Please enter a valid amount',
    contributionMade: 'Your contribution has been made!',
    thankYouForContributing: 'Thank you for your contribution!',
    viewDetails: 'View Details',
    thisItemGifted: 'This item has been gifted!',
    thankYouGiftGiver: 'Thank you to our generous gift giver ❤️',
    
    // =========================================================================
    // 📝 GIFT FORM (Where people enter their details)
    // =========================================================================
    
    // Form labels and placeholders
    yourName: 'Your Name',
    yourNameRequired: 'Your Name *',
    enterFullName: 'Enter your full name',
    message: 'Message (Optional)',
    messageDescription: 'Add a personal message for the gift recipients...',
    
    // Form validation and errors
    pleaseEnterName: 'Please enter your name',
    failedToProcess: 'Failed to process gift claim. Please try again.',
    processing: 'Processing...',
    
    // Payment workflow
    paymentInstructions: '💳 Enter your email to receive payment instructions and we\'ll also open Revolut for you.',
    payForGift: 'Reserve & Pay',
    email: 'Email Address *',
    enterEmail: 'Enter your email address',
    pleaseEnterEmail: 'Please enter your email address',
    invalidEmail: 'Please enter a valid email address',
    emailSent: 'Email sent! Check your inbox and complete payment in the Revolut tab.',
    itemReservedSuccess: 'Item reserved! Complete payment in the Revolut tab and check your email for instructions.',
    
    // =========================================================================
    // ✅ SUCCESS & THANK YOU PAGES
    // =========================================================================
    
    thankYou: 'Thank you',
    giftSuccessfullyConfirmed: 'Your gift has been successfully confirmed! The recipients have been notified and the item has been marked as gifted.',
    whatHappensNextSuccess: 'What happens next?',
    recipientsHaveBeenNotified: 'The recipients have been notified about your gift',
    itemNowMarkedAsGifted: 'The item is now marked as "gifted" on the wishlist',
    receiveConfirmation: 'You\'ll receive a confirmation if you provided contact details',
    backToWishlist: 'Back to Wishlist',
    
    // =========================================================================
    // 🚫 ALREADY GIFTED MESSAGES
    // =========================================================================
    
    itemAlreadyGifted: 'This item has already been gifted!',
    someoneAlreadyClaimed: 'Someone has already claimed this gift. Thank you for your interest in giving!',
    thankYouGenerous: 'Thank you to our generous gift giver!',
    chooseAnotherGift: 'Choose another gift',
    
    // =========================================================================
    // ⏳ RESERVED ITEM MESSAGES
    // =========================================================================
    
    itemReserved: 'This item is reserved!',
    awaitingPayment: 'Payment is being processed',
    
    // =========================================================================
    // 🔗 NAVIGATION & LINKS
    // =========================================================================
    
    backToWishlistShort: 'Back to wishlist',
    giftThisItem: 'Gift this item',
    viewItem: 'View item',
    giftNotFound: 'Gift Not Found',
    giftNotFoundDescription: 'The gift item you\'re looking for doesn\'t exist or may have been removed from the wishlist.',
    
    // =========================================================================
    // 📧 EMAIL NOTIFICATIONS
    // =========================================================================
    
    greatNews: 'Great News!',
    someoneWantsToGift: 'Someone wants to gift you an item from your registry!',
    itemDetails: 'Item Details',
    item: 'Item',
    price: 'Price',
    link: 'Link',
    viewItemEmail: 'View Item →',
    fromTheGiftGiver: 'From the Gift Giver',
    name: 'Name',
    itemMarkedAsGiftedEmail: 'This item has been marked as gifted on your registry!',
    giftGiverWillReceive: 'The gift giver will receive Revolut payment instructions.',
    giftAlert: 'Gift Alert',
    wantsToGiftYou: 'wants to gift you',

    // =========================================================================
    // 💳 PAYMENT INSTRUCTIONS EMAIL
    // =========================================================================

    paymentInstructionsTitle: 'Payment Instructions',
    finalizePaymentForGift: 'Finalize the payment for your gift',
    paymentGiftDetails: 'Gift Details',
    article: 'Article',
    amount: 'Amount',
    paymentReservedBy: 'Reserved by',
    payWithRevolut: 'Pay with Revolut',
    itemReservedForYou: 'This item has been reserved for you.',
    oncePaymentConfirmed: 'Once payment is confirmed, it will be marked as gifted.',
    paymentSubject: 'Payment Instructions',

    // =========================================================================
    // 🌐 SITE METADATA
    // =========================================================================

    registryDescription: 'A beautiful gift registry for any occasion',
  },
  
  // ===========================================================================
  // 🇫🇷 FRENCH TRANSLATIONS
  // ===========================================================================
  // Copy of all the English text above, translated to French
  // You can edit these French translations or remove this section entirely
  // if you only want English
  // ===========================================================================
  
  fr: {
    // 🏠 HOME PAGE
    howItWorks: 'Comment ça marche',
    browseAndChoose: 'Parcourir la liste',
    browseDescription: 'Parcourez la liste et trouvez quelque chose que vous aimeriez offrir',
    claimTheGift: 'Choisir votre cadeau',
    claimDescription: 'Cliquez sur "Offrir" et remplissez le formulaire',
    sendViaRevolut: 'Envoyer via Revolut',
    sendDescription: 'Utilisez le lien Revolut fourni pour envoyer l\'argent du cadeau',
    
    // 🎁 GIFT CARDS & BUTTONS
    alreadyGifted: 'Déjà offert',
    reserved: 'Réservé',
    giftedBy: 'Offert par',
    reservedBy: 'Réservé par',
    iWantToGiftThis: 'Offrir',
    iWantToContribute: 'Contribuer',
    customAmount: 'Libre €',
    contributionsMade: 'contributions faites',
    enterAmount: 'Entrez le montant de votre contribution',
    customPrice: 'Montant personnalisé *',
    pleaseEnterAmount: 'Veuillez entrer un montant',
    invalidAmount: 'Veuillez entrer un montant valide',
    contributionMade: 'Votre contribution a été enregistrée !',
    thankYouForContributing: 'Merci pour votre contribution !',
    viewDetails: 'Voir les détails',
    thisItemGifted: 'Cet article a déjà été offert !',
    thankYouGiftGiver: 'Merci pour votre gentillesse ❤️',
    
    // 📝 GIFT FORM
    yourName: 'Votre nom',
    yourNameRequired: 'Votre nom *',
    enterFullName: 'Entrez votre nom complet',
    message: 'Message (Optionnel)',
    messageDescription: 'Ajoutez un message personnel pour les destinataires du cadeau...',
    pleaseEnterName: 'Veuillez entrer votre nom',
    failedToProcess: 'Échec du traitement de la réclamation du cadeau. Veuillez réessayer.',
    processing: 'Traitement en cours...',
    paymentInstructions: '💳 Entrez votre email pour recevoir les instructions de paiement et nous ouvrirons aussi Revolut pour vous.',
    payForGift: 'Réserver et payer',
    email: 'Adresse email *',
    enterEmail: 'Entrez votre adresse email',
    pleaseEnterEmail: 'Veuillez entrer votre adresse email',
    invalidEmail: 'Veuillez entrer une adresse email valide',
    emailSent: 'Email envoyé ! Vérifiez votre boîte de réception et finalisez le paiement dans l\'onglet Revolut.',
    itemReservedSuccess: 'L\'article a été réservé ! Finalisez le paiement dans l\'onglet Revolut et vérifiez votre email pour les instructions.',
    
    // ✅ SUCCESS & THANK YOU PAGES
    thankYou: 'Merci',
    giftSuccessfullyConfirmed: 'Votre cadeau a été confirmé avec succès ! Les destinataires ont été notifiés et l\'article a été marqué comme offert.',
    whatHappensNextSuccess: 'Que se passe-t-il ensuite ?',
    recipientsHaveBeenNotified: 'Les destinataires ont été notifiés de votre cadeau',
    itemNowMarkedAsGifted: 'L\'article est maintenant marqué comme "offert" sur la liste de souhaits',
    receiveConfirmation: 'Vous recevrez une confirmation si vous avez fourni vos coordonnées',
    backToWishlist: 'Retour à la liste de souhaits',
    
    // 🚫 ALREADY GIFTED MESSAGES
    itemAlreadyGifted: 'Cet article a déjà été offert !',
    someoneAlreadyClaimed: 'Cet article a déjà été offert !',
    thankYouGenerous: 'Merci pour votre gentillesse ❤️',
    chooseAnotherGift: 'Choisir un autre cadeau',
    
    // ⏳ RESERVED ITEM MESSAGES
    itemReserved: 'Cet article est réservé !',
    awaitingPayment: 'En attente de paiement',
    
    // 🔗 NAVIGATION & LINKS
    backToWishlistShort: 'Retour à la liste',
    giftThisItem: 'Offrir cet article',
    viewItem: 'Voir l\'article',
    giftNotFound: 'Cadeau introuvable',
    giftNotFoundDescription: 'L\'article que vous recherchez n\'existe pas ou a peut-être été retiré de la liste de souhaits.',
    
    // 📧 EMAIL NOTIFICATIONS
    greatNews: 'Excellente nouvelle !',
    someoneWantsToGift: 'Quelqu\'un veut vous offrir un article !',
    itemDetails: 'Détails de l\'article',
    item: 'Article',
    price: 'Prix',
    link: 'Lien',
    viewItemEmail: 'Voir l\'article →',
    fromTheGiftGiver: 'De la part du donateur',
    name: 'Nom',
    itemMarkedAsGiftedEmail: 'Cet article a été marqué comme offert sur votre liste !',
    giftGiverWillReceive: 'Le donateur recevra les instructions de paiement Revolut.',
    giftAlert: 'Alerte cadeau',
    wantsToGiftYou: 'veut vous offrir',

    // 💳 PAYMENT INSTRUCTIONS EMAIL
    paymentInstructionsTitle: 'Instructions de paiement',
    finalizePaymentForGift: 'Finalisez le paiement de votre cadeau',
    paymentGiftDetails: 'Détails du cadeau',
    article: 'Article',
    amount: 'Montant',
    paymentReservedBy: 'Réservé par',
    payWithRevolut: 'Payer avec Revolut',
    itemReservedForYou: 'Cet article a été réservé pour vous.',
    oncePaymentConfirmed: 'Une fois le paiement confirmé, il sera marqué comme offert.',
    paymentSubject: 'Instructions de paiement',

    // 🌐 SITE METADATA
    registryDescription: 'Liste de cadeaux — Trouvez le cadeau parfait',
  }
};

// =============================================================================
// TRANSLATION FUNCTION - DO NOT EDIT BELOW THIS LINE
// =============================================================================
// This function automatically picks the right language based on your config
// =============================================================================

export function t(key: string): string {
  const lang = env.language || 'en';
  const langTranslations = translations[lang as keyof typeof translations] || translations.en;
  return langTranslations[key as keyof typeof langTranslations] || key;
}