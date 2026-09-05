// ─────────────────────────────────────────────────────────────────────────────
// AYRA LABS — BixGrow Webhook Handler
// Deploy this file to Vercel as an API route.
// BixGrow will POST to this URL every time an affiliate order is created.
// ─────────────────────────────────────────────────────────────────────────────

// Install dependencies first:
//   npm install @supabase/supabase-js crypto

import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

// ── Supabase client ───────────────────────────────────────────────────────────
// Set these in your Vercel environment variables (never hardcode them)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ── Verify BixGrow webhook signature ─────────────────────────────────────────
// BixGrow signs every webhook with HMAC-SHA256 using your API key as the secret.
// Always verify this to prevent fake requests hitting your endpoint.
function verifySignature(rawBody, signature, secret) {
  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(expected, "hex"),
    Buffer.from(signature, "hex")
  );
}

// ── Main handler ──────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // Only accept POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Get raw body for signature verification
  const rawBody = JSON.stringify(req.body);
  const signature = req.headers["x-bixgrow-signature"] || "";
  const secret = process.env.BIXGROW_WEBHOOK_SECRET; // Your BixGrow API key

  // Verify signature (skip in dev if secret not set)
  if (secret && !verifySignature(rawBody, signature, secret)) {
    console.error("[BixGrow] Invalid signature — request rejected");
    return res.status(401).json({ error: "Invalid signature" });
  }

  const event = req.body;
  console.log("[BixGrow] Received event:", event.topic, JSON.stringify(event));

  // ── Handle Order Created ───────────────────────────────────────────────────
  // BixGrow fires this when an order is attributed to an affiliate's code
  if (event.topic === "order/created" || event.topic === "order_created") {
    const {
      affiliate_coupon,   // The discount code used e.g. "JADE15"
      affiliate_id,       // BixGrow's internal affiliate ID
      affiliate_email,    // Affiliate's email
      order_id,           // Shopify order ID
      order_number,       // e.g. "#1234"
      order_total,        // Total order value
      created_at,         // Timestamp
    } = event;

    if (!affiliate_coupon && !affiliate_email) {
      return res.status(200).json({ message: "No affiliate data, skipping" });
    }

    try {
      // 1. Find the creator in your portal by their affiliate code or email
      let query = supabase.from("creators").select("*");
      if (affiliate_coupon) {
        query = query.ilike("affiliate_code", affiliate_coupon);
      } else if (affiliate_email) {
        query = query.eq("email", affiliate_email);
      }

      const { data: creators, error: findError } = await query;

      if (findError) throw findError;
      if (!creators || creators.length === 0) {
        console.log(`[BixGrow] No creator found for code: ${affiliate_coupon}`);
        // Still return 200 so BixGrow doesn't retry — just log it
        return res.status(200).json({ message: "Creator not found, skipping" });
      }

      const creator = creators[0];

      // 2. Insert the order into your orders table
      const { error: insertError } = await supabase
        .from("affiliate_orders")
        .insert({
          creator_id: creator.id,
          bixgrow_affiliate_id: affiliate_id,
          discount_code: affiliate_coupon,
          shopify_order_id: String(order_id),
          order_number: order_number,
          order_total: parseFloat(order_total) || 0,
          order_date: created_at || new Date().toISOString(),
          status: "created",
        });

      if (insertError) {
        // Duplicate order — BixGrow sometimes sends twice, just ignore
        if (insertError.code === "23505") {
          return res.status(200).json({ message: "Duplicate order, skipping" });
        }
        throw insertError;
      }

      console.log(
        `[BixGrow] Order ${order_number} recorded for ${creator.name} (${affiliate_coupon})`
      );

      return res.status(200).json({
        success: true,
        creator: creator.name,
        order: order_number,
      });

    } catch (err) {
      console.error("[BixGrow] Error processing order:", err);
      // Return 500 so BixGrow knows to retry
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // ── Handle Order Approved ──────────────────────────────────────────────────
  if (event.topic === "order/approved" || event.topic === "order_approved") {
    const { order_id } = event;
    try {
      await supabase
        .from("affiliate_orders")
        .update({ status: "approved" })
        .eq("shopify_order_id", String(order_id));

      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // ── Ignore other events ────────────────────────────────────────────────────
  return res.status(200).json({ message: `Event ${event.topic} ignored` });
}
