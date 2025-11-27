import { google } from 'googleapis';
import { env } from './env';

// Default placeholder used when no valid image is available
const DEFAULT_PLACEHOLDER_IMAGE =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTk5OTkiPkFydGljbGUgY2FkZWF1PC90ZXh0Pjwvc3ZnPg==';

// Returns true when the provided URL points directly to an image resource
function isDirectImageUrl(possibleUrl: string): boolean {
  if (!possibleUrl) return false;
  try {
    const parsed = new URL(possibleUrl);
    const pathname = parsed.pathname.toLowerCase();
    return /\.(png|jpe?g|webp|gif|bmp|svg)$/.test(pathname);
  } catch {
    return false;
  }
}

// Handle service account for both local and production environments
async function getServiceAccount() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    // Production: use JSON string from environment variable
    return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  } else {
    // Local development: try to use service_account.json file
    try {
      const fs = await import('fs');
      const path = await import('path');
      const serviceAccountPath = path.resolve(process.cwd(), 'service_account.json');
      const serviceAccountContent = fs.readFileSync(serviceAccountPath, 'utf8');
      return JSON.parse(serviceAccountContent);
    } catch (error) {
      throw new Error('Google Service Account not found. Please set GOOGLE_SERVICE_ACCOUNT_JSON environment variable or create service_account.json file.');
    }
  }
}

export interface WishlistItem {
  id: string;
  name: string;
  description: string;
  price: string;
  link: string;
  image: string;
  isGifted: boolean;
  isReserved: boolean;
  isCustomPrice: boolean;
  contributionCount: number;
  reservedBy?: string;
  reservedDate?: string;
  reservedEmail?: string;
  reservedMessage?: string;
}

export class SheetsService {
  private sheets: any;
  private initialized: Promise<void>;
  
  constructor() {
    this.initialized = this.initialize();
  }
  
  private async initialize() {
    const serviceAccount = await getServiceAccount();
    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    
    this.sheets = google.sheets({ version: 'v4', auth });
  }

  async getWishlistItems(): Promise<WishlistItem[]> {
    await this.initialized;
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: env.spreadsheetId,
        range: 'Sheet1!A2:M', // Extended to column M to include IsGifted
      });

      const rows = response.data.values || [];
      
      return rows.map((row: any[], index: number) => ({
        id: (index + 2).toString(), // Row number as ID (starting from 2)
        name: row[0] || '',
        description: row[1] || '',
        price: row[2] || '',
        link: row[3] || '',
        image: row[4] || (isDirectImageUrl(row[3] || '') ? row[3] : DEFAULT_PLACEHOLDER_IMAGE),
        isReserved: row[5]?.toLowerCase() === 'true' || row[5]?.toLowerCase() === 'yes',
        reservedBy: row[6] || '',
        reservedDate: row[7] || '',
        reservedEmail: row[8] || '',
        reservedMessage: row[9] || '',
        isCustomPrice: row[10]?.toLowerCase() === 'true' || row[10]?.toLowerCase() === 'yes',
        contributionCount: parseInt(row[11]) || 0,
        isGifted: row[12]?.toLowerCase() === 'true' || row[12]?.toLowerCase() === 'yes',
      }));
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
      return [];
    }
  }


  async markAsReserved(itemId: string, reservedBy: string, email: string, message: string): Promise<boolean> {
    await this.initialized;
    try {
      const rowNumber = parseInt(itemId);
      const range = `Sheet1!F${rowNumber}:J${rowNumber}`;
      
      const values = [
        [
          'true', // isReserved
          reservedBy, // reservedBy
          new Date().toISOString().split('T')[0], // reservedDate (YYYY-MM-DD)
          email, // reservedEmail
          message, // reservedMessage
        ]
      ];

      await this.sheets.spreadsheets.values.update({
        spreadsheetId: env.spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        resource: { values },
      });

      return true;
    } catch (error) {
      console.error('Error marking item as reserved:', error);
      return false;
    }
  }

  async incrementContributionCount(itemId: string): Promise<boolean> {
    await this.initialized;
    try {
      const item = await this.getItemById(itemId);
      if (!item || !item.isCustomPrice) {
        return false;
      }

      const rowNumber = parseInt(itemId);
      const range = `Sheet1!L${rowNumber}`;
      
      const newCount = item.contributionCount + 1;
      const values = [[newCount.toString()]];

      await this.sheets.spreadsheets.values.update({
        spreadsheetId: env.spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        resource: { values },
      });

      return true;
    } catch (error) {
      console.error('Error incrementing contribution count:', error);
      return false;
    }
  }

  async getItemById(itemId: string): Promise<WishlistItem | null> {
    const items = await this.getWishlistItems();
    return items.find(item => item.id === itemId) || null;
  }

  async markAsGifted(itemId: string, giftedBy: string, message?: string): Promise<boolean> {
    await this.initialized;
    try {
      const rowNumber = parseInt(itemId);
      // Update columns M (isGifted), N (giftedBy), O (giftedMessage), P (giftedDate)
      const range = `Sheet1!M${rowNumber}:P${rowNumber}`;
      
      const values = [
        [
          'true', // isGifted (column M)
          giftedBy, // giftedBy (column N)
          message || '', // giftedMessage (column O)
          new Date().toISOString().split('T')[0], // giftedDate (column P) - YYYY-MM-DD format
        ]
      ];

      await this.sheets.spreadsheets.values.update({
        spreadsheetId: env.spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        resource: { values },
      });

      return true;
    } catch (error) {
      console.error('Error marking item as gifted:', error);
      return false;
    }
  }
}