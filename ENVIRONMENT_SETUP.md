# 🔧 Environment Setup Guide

This guide explains how to configure the development environment for the Next.js + Supabase framework.

## 🚀 Quick Start

1.  **Duplicate the example file:**
    Copy `.env.example` to `.env.local` (this file is git-ignored).

    ```bash
    cp .env.example .env.local
    ```

2.  **Update Supabase Credentials:**
    Open `.env.local` and fill in your Supabase project details (see instructions below).

3.  **Run the application:**
    ```bash
    npm run dev
    ```

---

## ☁️ Supabase Integration (Modern Method)

This framework uses the latest **@supabase/ssr** package for Next.js 16 integration, replacing older connection methods.

### 1. Get Your API Keys

Go to your Supabase Dashboard: **Settings** → **API**.

You need two values:

| Environment Variable | Dashboard Label | Description |
|----------------------|-----------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | **Project URL** | The API endpoint for your project. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | **API Keys** → **Publishable Key** | Safe to expose in the browser. Formerly called the "anon" or "public" key. |

> **⚠️ Security Warning:** NEVER expose your secret key (`SUPABASE_SECRET_KEY`, formerly `service_role` key) in `NEXT_PUBLIC_` variables. It bypasses all database security policies and RLS rules.

### 2. Configure Authentication

In your Supabase Dashboard: **Authentication** → **Providers**.

*   **Email:** Enable "Email provider".
*   **Google (Optional):** Enable "Google", add your Client ID/Secret.
*   **Phone (Optional):** Enable "Phone", configure Twilio/MessageBird if using SMS.

---

## 🛠️ Configuration Scenarios

The framework supports "Feature Flags" in `.env.local` to toggle features without code changes.

### Scenario 1: Development Mode (Cost Saving)
*Best for local testing without spending money on SMS/Email quotas.*

```env
NEXT_PUBLIC_ENABLE_OAUTH=true
NEXT_PUBLIC_ENABLE_EMAIL=true
NEXT_PUBLIC_ENABLE_PHONE=true
NEXT_PUBLIC_REQUIRE_PHONE_VERIFICATION=true
NEXT_PUBLIC_SKIP_PHONE_OTP_IN_DEV=true     # <--- Key setting: Skips sending real SMS
```

### Scenario 2: Production
*Full security enabled.*

```env
NEXT_PUBLIC_SKIP_PHONE_OTP_IN_DEV=false    # <--- Enforce real SMS verification
```

### Scenario 3: Automated Testing
*Bypasses OTPs for UI tests.*

```env
NEXT_PUBLIC_AUTH_TEST_MODE=true            # <--- Auto-verifies any OTP code
```

---

## 🔄 Deployment

When deploying to Vercel or other platforms:

1.  **Add Environment Variables:** Copy all values from `.env.local` to your deployment platform's environment variables settings.
2.  **Build Command:** `npm run build`
3.  **Install Command:** `npm install`

---

## ❓ FAQ

**Q: "Anon Key" vs "Publishable Key" and "Service Role Key" vs "Secret Key"?**
A: They represent the same credential types. Supabase updated the names to "Publishable Key" (safe for client-side use) and "Secret Key" (strictly for backend use, bypassing RLS). This framework supports the new environment variables (`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` and `SUPABASE_SECRET_KEY`) with fallback support to the legacy names (`NEXT_PUBLIC_SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY`) for compatibility.

**Q: Where is `createClient`?**
A: This framework uses the modern `@supabase/ssr` pattern. Check `utils/supabase/server.ts` and `utils/supabase/client.ts` for the client initialization logic.
