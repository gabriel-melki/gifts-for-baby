import { NextRequest, NextResponse } from 'next/server';
import { SheetsService } from '../../../lib/sheets';
import { ResendEmailService } from '../../../lib/email-resend';

export async function POST(request: NextRequest) {
  try {
    const { itemId, giftedBy, message } = await request.json();

    if (!itemId || !giftedBy) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const sheetsService = new SheetsService();
    const emailService = new ResendEmailService();

    // Get the item details
    const item = await sheetsService.getItemById(itemId);
    if (!item) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    // Check if item is already gifted
    if (item.isGifted) {
      return NextResponse.json(
        { error: 'Item has already been gifted' },
        { status: 409 }
      );
    }

    // Mark item as gifted in the spreadsheet
    const success = await sheetsService.markAsGifted(itemId, giftedBy, message);
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update spreadsheet' },
        { status: 500 }
      );
    }

    // Send email notification
    try {
      await emailService.sendGiftNotification({
        itemName: item.name,
        giftedBy,
        message: message || 'No message provided',
        itemLink: item.link,
        price: item.price,
      });
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Gift claim processed successfully',
    });
  } catch (error) {
    console.error('Gift API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}