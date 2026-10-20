// Sends a phone notification to the person who made a request when their helper answers.
// Called by helper.html right after the helper taps an answer. The request's secret
// token is the only input, so a helper link can only notify that one request's owner,
// and only within a few minutes of an answer.
import { createClient } from "jsr:@supabase/supabase-js@2";

const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
const account = JSON.parse(Deno.env.get("FIREBASE_SERVICE_ACCOUNT") ?? "{}");

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

const WORDS = {
  en: {
    title: "Easy Help",
    what: { groceries: "Groceries", medicine: "Pharmacy", ride: "A ride", helper: "Help at home", pro: "Professionals", errands: "Bills & papers", location: "Location" },
    seen: "{name} has seen your request: {what}.", coming: "{name} is on the way: {what}.",
    later: "{name} will come later: {what}.", cant: "{name} can't help with this one: {what}.",
    done: "{name} says it is done: {what}.", helper: "Your helper",
  },
  ar: {
    title: "إيزي هيلب",
    what: { groceries: "بقالة", medicine: "صيدلية", ride: "توصيلة", helper: "مساعدة في البيت", pro: "متخصصون", errands: "فواتير وأوراق", location: "الموقع" },
    seen: "{name} رأى طلبك: {what}.", coming: "{name} في الطريق: {what}.",
    later: "{name} سيأتي لاحقًا: {what}.", cant: "{name} لا يستطيع المساعدة هذه المرة: {what}.",
    done: "{name} يقول إن الطلب تم: {what}.", helper: "مساعدك",
  },
} as const;

// A Google access token for Firebase Cloud Messaging, from the service account key.
let cached: { token: string; until: number } | null = null;
async function accessToken(): Promise<string> {
  if (cached && cached.until > Date.now() + 60_000) return cached.token;
  const b64 = (data: ArrayBuffer | string) =>
    btoa(typeof data === "string" ? data : String.fromCharCode(...new Uint8Array(data)))
      .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const now = Math.floor(Date.now() / 1000);
  const head = b64(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64(JSON.stringify({
    iss: account.client_email, scope: "https://www.googleapis.com/auth/firebase.messaging",
    aud: account.token_uri, iat: now, exp: now + 3600,
  }));
  const pem = String(account.private_key).replace(/-----[^-]+-----/g, "").replace(/\s+/g, "");
  const der = Uint8Array.from(atob(pem), (c) => c.charCodeAt(0));
  const key = await crypto.subtle.importKey("pkcs8", der, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(`${head}.${claims}`));
  const res = await fetch(account.token_uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${head}.${claims}.${b64(sig)}` }),
  });
  const out = await res.json();
  if (!out.access_token) throw new Error("no Google access token");
  cached = { token: out.access_token, until: Date.now() + (out.expires_in ?? 3600) * 1000 };
  return cached.token;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  if (req.method !== "POST") return json({ error: "POST only" }, 405);
  if (!account.private_key) return json({ error: "FIREBASE_SERVICE_ACCOUNT is not set" }, 500);

  const { token } = await req.json().catch(() => ({}));
  if (typeof token !== "string" || !/^[0-9a-f-]{36}$/i.test(token)) return json({ error: "bad token" }, 400);

  const { data: request } = await supabase
    .from("hh_requests").select("user_id, type, status, status_at").eq("token", token).maybeSingle();
  if (!request || request.status === "sent") return json({ sent: 0 });
  // Only right after an answer, so an old link can't be used to send notifications again and again.
  if (!request.status_at || Date.now() - Date.parse(request.status_at) > 5 * 60_000) return json({ sent: 0 });

  const [{ data: devices }, { data: profile }] = await Promise.all([
    supabase.from("hh_push_tokens").select("token, lang").eq("user_id", request.user_id),
    supabase.from("hh_profiles").select("settings").eq("id", request.user_id).maybeSingle(),
  ]);
  if (!devices?.length) return json({ sent: 0 });

  const access = await accessToken();
  let sent = 0;
  for (const device of devices) {
    const w = device.lang === "ar" ? WORDS.ar : WORDS.en;
    const name = (profile?.settings?.helperName as string) || w.helper;
    const what = (w.what as Record<string, string>)[request.type] ?? request.type;
    const body = ((w as Record<string, unknown>)[request.status] as string ?? w.seen).replace("{name}", name).replace("{what}", what);
    const res = await fetch(`https://fcm.googleapis.com/v1/projects/${account.project_id}/messages:send`, {
      method: "POST",
      headers: { Authorization: `Bearer ${access}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: {
          token: device.token,
          notification: { title: w.title, body },
          data: { screen: "requests" },
          android: { priority: "high", notification: { default_sound: true } },
        },
      }),
    });
    if (res.ok) sent++;
    else if (res.status === 404 || res.status === 400) {
      // The app was removed or the token is no longer valid.
      await supabase.from("hh_push_tokens").delete().eq("token", device.token);
    }
  }
  return json({ sent });
});
