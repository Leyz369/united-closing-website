import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("SITE_URL") || "https://united-closing.com",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const body = await req.json();

    // ElevenLabs sends conversation data or frontend sends update
    const {
      submission_id,
      conversation_id,
      transcript,
      summary,
      experience,
      hours_per_week,
      income_goal,
      start_date,
      motivation,
      video_watched,
      cal_booked,
    } = body;

    if (!submission_id) {
      return new Response(
        JSON.stringify({ ok: false, error: "submission_id required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const updateData: Record<string, unknown> = {};

    if (conversation_id) updateData.agent_conversation_id = conversation_id;
    if (summary) updateData.agent_summary = summary;
    if (experience) updateData.experience = experience;
    if (hours_per_week) updateData.hours_per_week = hours_per_week;
    if (income_goal) updateData.income_goal = income_goal;
    if (start_date) updateData.start_date = start_date;
    if (motivation) updateData.motivation = motivation;
    if (video_watched !== undefined) updateData.video_watched = video_watched;
    if (cal_booked !== undefined) updateData.cal_booked = cal_booked;

    // Set lead_tier based on what data we have
    if (conversation_id || summary) {
      updateData.lead_tier = "qualifiziert";
    }
    if (cal_booked) {
      updateData.lead_tier = "termin_gebucht";
    }

    const { error } = await supabase
      .from("contact_submissions")
      .update(updateData)
      .eq("id", submission_id);

    if (error) {
      console.error("Update error:", error);
      return new Response(
        JSON.stringify({ ok: false, error: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ ok: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("agent-webhook error:", err);
    return new Response(
      JSON.stringify({ ok: false, error: err instanceof Error ? err.message : "Fehler" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
