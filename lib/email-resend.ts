import { Resend } from 'resend';
import { env } from './env';
import { t } from './translations';

export interface GiftNotification {
  itemName: string;
  giftedBy: string;
  message: string;
  itemLink: string;
  price: string;
}

export interface PaymentInstructions {
  itemName: string;
  price: string;
  revolutLink: string;
  giftedBy: string;
}

export class ResendEmailService {
  private resend: Resend;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is required');
    }
    this.resend = new Resend(apiKey);
  }

  async sendGiftNotification(notification: GiftNotification): Promise<boolean> {
    try {
      const emailHTML = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fefcf9;">
          <div style="background-color: #fcf0e0; padding: 30px; border-radius: 15px; border: 2px solid #f9e4c7;">
            <div style="text-align: center; margin-bottom: 25px;">
              <h2 style="color: #d17e2f; margin: 0; font-size: 28px;">🎁 ${t('greatNews')}</h2>
              <p style="color: #8f5226; margin-top: 8px; font-size: 18px;">${t('someoneWantsToGift')}</p>
            </div>
            
            <div style="background-color: #fefdf8; padding: 25px; border-radius: 12px; margin-bottom: 20px; border-left: 4px solid #f4a852;">
              <h3 style="margin-top: 0; color: #b06329; font-size: 20px;">📦 ${t('itemDetails')}</h3>
              <p style="margin: 8px 0; color: #8f5226;"><strong>${t('item')}:</strong> ${notification.itemName}</p>
              <p style="margin: 8px 0; color: #8f5226;"><strong>${t('price')}:</strong> ${notification.price}</p>
              <p style="margin: 8px 0; color: #8f5226;"><strong>${t('link')}:</strong> <a href="${notification.itemLink}" style="color: #d17e2f; text-decoration: none;">${t('viewItemEmail')}</a></p>
            </div>
            
            <div style="background-color: #f0f9ff; padding: 25px; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid #0ea5e9;">
              <h3 style="margin-top: 0; color: #0369a1; font-size: 20px;">💝 ${t('fromTheGiftGiver')}</h3>
              <p style="margin: 8px 0; color: #0284c7;"><strong>${t('name')}:</strong> ${notification.giftedBy}</p>
              <p style="margin: 8px 0; color: #0284c7;"><strong>${t('message')}:</strong> "${notification.message}"</p>
            </div>
            
            <div style="text-align: center; padding: 20px; background-color: #fef7e6; border-radius: 10px;">
              <p style="color: #d17e2f; margin: 0; font-size: 16px;">
                🎉 ${t('itemMarkedAsGiftedEmail')}
              </p>
              <p style="color: #8f5226; margin: 10px 0 0 0; font-size: 14px;">
                ${t('giftGiverWillReceive')}
              </p>
            </div>
          </div>
        </div>
      `;

      // Note: Email addresses are intentionally not logged for privacy
      
      const result = await this.resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || `${env.pageTitle} <onboarding@resend.dev>`,
        to: env.notificationEmails,
        subject: `🎁 ${t('giftAlert')}: ${notification.giftedBy} ${t('wantsToGiftYou')} "${notification.itemName}"`,
        html: emailHTML,
      });

      console.log('Email sent successfully:', result);
      return true;
    } catch (error) {
      console.error('Error sending email with Resend:', error);
      return false;
    }
  }

  async sendPaymentInstructions(email: string, instructions: PaymentInstructions): Promise<boolean> {
    try {
      const emailHTML = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fefcf9;">
          <div style="background-color: #f0f9ff; padding: 30px; border-radius: 15px; border: 2px solid #e0f2fe;">
            <div style="text-align: center; margin-bottom: 25px;">
              <h2 style="color: #0369a1; margin: 0; font-size: 28px;">💳 ${t('paymentInstructionsTitle')}</h2>
              <p style="color: #0284c7; margin-top: 8px; font-size: 18px;">${t('finalizePaymentForGift')}</p>
            </div>

            <div style="background-color: #fefdf8; padding: 25px; border-radius: 12px; margin-bottom: 20px; border-left: 4px solid #0ea5e9;">
              <h3 style="margin-top: 0; color: #b06329; font-size: 20px;">🎁 ${t('paymentGiftDetails')}</h3>
              <p style="margin: 8px 0; color: #8f5226;"><strong>${t('article')} :</strong> ${instructions.itemName}</p>
              <p style="margin: 8px 0; color: #8f5226;"><strong>${t('amount')} :</strong> ${instructions.price}</p>
              <p style="margin: 8px 0; color: #8f5226;"><strong>${t('paymentReservedBy')} :</strong> ${instructions.giftedBy}</p>
            </div>

            <div style="text-align: center; margin-bottom: 25px;">
              <a href="${instructions.revolutLink}"
                 style="display: inline-block; background-color: #0369a1; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                💳 ${t('payWithRevolut')}
              </a>
            </div>

            <div style="background-color: #fef7e6; padding: 20px; border-radius: 10px; text-align: center;">
              <p style="color: #d17e2f; margin: 0; font-size: 14px;">
                ✅ ${t('itemReservedForYou')}<br>
                ${t('oncePaymentConfirmed')}
              </p>
            </div>
          </div>
        </div>
      `;

      const result = await this.resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || `${env.pageTitle} <onboarding@resend.dev>`,
        to: [email],
        subject: `💳 ${t('paymentSubject')} : ${instructions.itemName} (${instructions.price})`,
        html: emailHTML,
      });

      console.log('Payment instructions email sent:', result);
      return true;
    } catch (error) {
      console.error('Error sending payment instructions email:', error);
      return false;
    }
  }
}