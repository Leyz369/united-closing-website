import { createClient } from 'npm:@supabase/supabase-js@2';
import { Resend } from 'npm:resend@3.2.0';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  availability: string;
  goals?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase configuration");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const formData: ContactFormData = await req.json();

    // Save to database (always)
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          availability: formData.availability,
          goals: formData.goals || '',
          status: 'new'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      throw new Error(`Failed to save submission: ${error.message}`);
    }

    // Send emails only if API key is configured
    let emailsSent = false;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);

        // Email to applicant (confirmation)
        const confirmationHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #7AA2FF 0%, #2EE9C6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                h1 { margin: 0; }
                p { margin: 15px 0; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>✅ Bewerbung erhalten!</h1>
                </div>
                <div class="content">
                  <p>Hallo ${formData.name},</p>
                  <p>vielen Dank für deine Bewerbung bei United Closing!</p>
                  <p>Wir haben deine Anfrage erhalten und werden uns innerhalb von 24 Stunden bei dir melden, um einen Termin für das Erstgespräch zu vereinbaren.</p>
                  <p>Bis bald,<br>Dein United Closing Team</p>
                </div>
              </div>
            </body>
          </html>
        `;

        // Email to team (notification)
        const notificationHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #7AA2FF 0%, #2EE9C6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .field { margin-bottom: 20px; }
                .label { font-weight: bold; color: #555; }
                .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #7AA2FF; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Neue Bewerbung eingegangen</h1>
                </div>
                <div class="content">
                  <div class="field">
                    <div class="label">Name:</div>
                    <div class="value">${formData.name}</div>
                  </div>
                  <div class="field">
                    <div class="label">E-Mail:</div>
                    <div class="value">${formData.email}</div>
                  </div>
                  ${formData.phone ? `
                  <div class="field">
                    <div class="label">Telefon:</div>
                    <div class="value">${formData.phone}</div>
                  </div>
                  ` : ''}
                  <div class="field">
                    <div class="label">Verfügbarkeit:</div>
                    <div class="value">${formData.availability}</div>
                  </div>
                  ${formData.goals ? `
                  <div class="field">
                    <div class="label">Ziele:</div>
                    <div class="value">${formData.goals}</div>
                  </div>
                  ` : ''}
                  <div class="field">
                    <div class="label">Submission ID:</div>
                    <div class="value">${data.id}</div>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `;

        // Send both emails
        const emailResults = await Promise.allSettled([
          // Confirmation to applicant
          resend.emails.send({
            from: 'United Closing <onboarding@resend.dev>',
            to: formData.email,
            subject: 'Bestätigung: Deine Bewerbung bei United Closing',
            html: confirmationHtml,
          }),
          // Notification to team
          resend.emails.send({
            from: 'United Closing <onboarding@resend.dev>',
            to: 'team@unitedclosing.com',
            subject: `Neue Bewerbung von ${formData.name}`,
            html: notificationHtml,
          }),
        ]);

        const failedEmails = emailResults.filter(result => result.status === 'rejected');
        emailsSent = failedEmails.length === 0;
        
        if (failedEmails.length > 0) {
          console.warn("Some emails failed to send:", failedEmails);
        }
      } catch (emailError) {
        console.warn("Email sending failed:", emailError);
      }
    } else {
      console.log("Resend API key not configured - skipping email notifications");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        submissionId: data.id,
        message: emailsSent 
          ? 'Anfrage erfolgreich gespeichert und E-Mails versendet'
          : 'Anfrage erfolgreich gespeichert',
        emailsSent
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error processing submission:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});