"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

declare global {
  interface Window {
    google?: any;
  }
}

export function GoogleOneTap() {
  const { setSession, user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only show One Tap for unauthenticated users when auth state is ready
    if (!ready || user) return;

    const clientId =
      "533417526050-5501uovhe4u42783b1t7q0ac664jtaq9.apps.googleusercontent.com";

    const handleGoogleCallback = async (response: any) => {
      try {
        const idToken = response.credential;
        if (!idToken) return;

        const res = await fetch("/api/auth/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_token: idToken }),
        });

        if (!res.ok) {
          console.error("Google One Tap sign-in failed");
          return;
        }

        const data = await res.json();

        const container =
          data?.data && (data.data.token || data.data.user || data.data.access_token)
            ? data.data
            : data;

        const token: string | undefined =
          container.token || container.access_token;
        const tokenType: string | undefined =
          container.token_type || data.token_type || "Bearer";
        const expiresIn: number | undefined =
          container.expires_in || data.expires_in;
        const userObj = container.user || data.user || {};

        const userData = {
          id: String(userObj.id || "1"),
          name: userObj.name || "User",
          email: userObj.email || "",
        };

        if (token) {
          const opts: any = {
            sameSite: "lax",
            secure:
              typeof window !== "undefined" &&
              window.location.protocol === "https:",
          };
          if (expiresIn && !isNaN(expiresIn)) {
            opts.expires = new Date(Date.now() + expiresIn * 1000);
          }
          Cookies.set("auth_token", token, opts);
          Cookies.set("auth_token_type", tokenType || "Bearer", opts);
        }

        if (typeof window !== "undefined") {
          window.localStorage.setItem("user_data", JSON.stringify(userData));
        }

        setSession(userData);

        // Optional: redirect to intended page or home after One Tap
        const redirectUrl = sessionStorage.getItem("redirectAfterLogin");
        if (redirectUrl) {
          sessionStorage.removeItem("redirectAfterLogin");
          router.push(redirectUrl);
        } else {
          router.refresh();
        }
      } catch (error) {
        console.error("Google One Tap error:", error);
      }
    };

    const initializeGoogleOneTap = () => {
      if (!window.google?.accounts?.id) return;

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleCallback,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      // Show the One Tap prompt
      window.google.accounts.id.prompt();
    };

    const scriptId = "google-identity-services";
    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (existingScript) {
      // Script already loaded or in progress
      if (window.google?.accounts?.id) {
        initializeGoogleOneTap();
      } else {
        existingScript.addEventListener("load", initializeGoogleOneTap, {
          once: true,
        });
      }
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.id = scriptId;
    script.onload = initializeGoogleOneTap;
    document.body.appendChild(script);

    // No special cleanup required; One Tap prompt is managed by Google.
  }, [ready, user, router, setSession]);

  // This component only manages the One Tap overlay; it does not render UI itself.
  return null;
}


