import { NextRequest, NextResponse } from 'next/server';
import { SheetsService } from '../../../lib/sheets';
import { ResendEmailService } from '../../../lib/email-resend';
import { env } from '../../../lib/env';

export async function POST(request: NextRequest) {
  try {
    const { itemId, name, message, email, customPrice } = await request.json();

    if (!itemId || !name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const sheetsService = new SheetsService();

    // Get the item details
    const item = await sheetsService.getItemById(itemId);
    if (!item) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    // Check if item is already gifted or reserved
    if (item.isGifted) {
      return NextResponse.json(
        { error: 'Item has already been gifted' },
        { status: 409 }
      );
    }

    // Only check if reserved for non-custom price items
    if (item.isReserved && !item.isCustomPrice) {
      return NextResponse.json(
        { error: 'Item has already been reserved' },
        { status: 409 }
      );
    }

    // For custom price items, only increment counter (don't mark as reserved)
    if (item.isCustomPrice) {
      await sheetsService.incrementContributionCount(itemId);
    } else {
      // For regular items, mark as reserved
      const reserveSuccess = await sheetsService.markAsReserved(itemId, name, email, message || 'Aucun message fourni');
      if (!reserveSuccess) {
        return NextResponse.json(
          { error: 'Failed to update spreadsheet' },
          { status: 500 }
        );
      }
    }

    // Determine display price
    const displayPrice = item.isCustomPrice && customPrice ? `€${customPrice}` : item.price;

    // Send email with payment link
    let emailSent = false;
    try {
      const emailService = new ResendEmailService();
      const revolutLink = env.revolutLink;
      
      const emailSuccess = await emailService.sendPaymentInstructions(email, {
        itemName: item.name,
        price: displayPrice,
        revolutLink,
        giftedBy: name
      });

      emailSent = emailSuccess;
      if (!emailSuccess) {
        console.error('Payment instructions email failed but item is reserved');
      }
    } catch (emailError) {
      console.error('Email service error:', emailError);
      emailSent = false;
    }

    // Send email notification to gift recipients
    try {
      const emailService = new ResendEmailService();
      await emailService.sendGiftNotification({
        itemName: item.name,
        giftedBy: name,
        message: message || 'Aucun message fourni',
        itemLink: item.link,
        price: displayPrice,
      });
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't fail the request if email fails
    }

    // Prepare response message with payment instructions
    const revolutLink = env.revolutLink;
    const baseMessage = item.isCustomPrice ? 'Contribution recorded successfully' : 'Item reserved successfully';
    const emailMessage = emailSent ? 'Payment instructions sent to your email.' : `Email delivery failed. Please pay ${displayPrice} via Revolut: ${revolutLink}`;
    
    return NextResponse.json({
      success: true,
      message: `${baseMessage}. ${emailMessage}`,
      paymentLink: revolutLink,
      emailSent
    });
  } catch (error) {
    console.error('Reserve API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}