// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

console.log("Initializing create-admin-user function with URL:", SUPABASE_URL);

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

function jsonResponse(body: any, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
      ...corsHeaders,
    },
  });
}

serve(async (req) => {
  console.log("Received request:", req.method);
  
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS request");
    return jsonResponse({}, 200);
  }

  try {
    console.log("Processing POST request");
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      console.log("Missing bearer token");
      return jsonResponse({ error: "Missing bearer token" }, 401);
    }

    console.log("Verifying user token");
    const {
      data: { user: requester },
      error: userErr,
    } = await supabaseAdmin.auth.getUser(token);
    if (userErr || !requester) {
      console.log("Token verification failed:", userErr);
      return jsonResponse({ error: "Invalid or expired token" }, 401);
    }
    
    console.log("User verified:", requester.id);

    // Verify requester is an admin
    console.log("Checking admin role for user:", requester.id);
    const { data: roleRows, error: roleErr } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", requester.id)
      .eq("role", "admin")
      .limit(1);

    if (roleErr) {
      console.log("Role check error:", roleErr);
      return jsonResponse({ error: "Failed to verify permissions" }, 500);
    }
    if (!roleRows || roleRows.length === 0) {
      console.log("User is not an admin");
      return jsonResponse({ error: "Forbidden: admin role required" }, 403);
    }
    
    console.log("Admin verified, parsing request body");

    const body = await req.json().catch(() => null);
    if (!body) {
      console.log("Invalid JSON body");
      return jsonResponse({ error: "Invalid JSON body" }, 400);
    }

    const email = String(body.email ?? "").trim();
    const password = String(body.password ?? "").trim();
    const fullName = String(body.fullName ?? "").trim();
    
    console.log("Creating admin user:", email);

    // Basic validation (keep simple to avoid extra deps)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return jsonResponse({ error: "Invalid email" }, 400);
    if (password.length < 8) return jsonResponse({ error: "Password must be at least 8 characters" }, 400);
    if (fullName.length < 2) return jsonResponse({ error: "Full name must be at least 2 characters" }, 400);

    // 1) Create the user
    console.log("Creating user in auth");
    const { data: createRes, error: createErr } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    });
    if (createErr || !createRes?.user) {
      console.log("Failed to create user:", createErr);
      return jsonResponse({ error: createErr?.message || "Failed to create user" }, 400);
    }

    const newUser = createRes.user;
    console.log("User created:", newUser.id);

    // 2) Upsert profile
    console.log("Creating profile");
    const { error: profileErr } = await supabaseAdmin
      .from("profiles")
      .upsert({ id: newUser.id, email, full_name: fullName }, { onConflict: "id" });
    if (profileErr) {
      console.log("Profile creation failed:", profileErr);
      return jsonResponse({ error: `Failed to upsert profile: ${profileErr.message}` }, 400);
    }

    // 3) Assign admin role
    console.log("Assigning admin role");
    const { error: roleAssignErr } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: newUser.id, role: "admin" });
    if (roleAssignErr) {
      console.log("Role assignment failed:", roleAssignErr);
      return jsonResponse({ error: `Failed to assign admin role: ${roleAssignErr.message}` }, 400);
    }

    console.log("Admin user created successfully:", newUser.id);
    return jsonResponse({ user_id: newUser.id, email: newUser.email, full_name: fullName }, 201);
  } catch (e: any) {
    console.error("Unexpected error:", e);
    return jsonResponse({ error: e?.message || "Unexpected error" }, 500);
  }
});
