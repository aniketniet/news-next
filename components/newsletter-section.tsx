"use client";

import { useState } from "react";

export function NewsletterSection() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const sampleHeadlines = [
        "Global markets react to policy shift",
        "Key climate summit reaches milestone accord",
        "Technology giants race for next-gen AI edge",
        "Health advisory issued after regional outbreak",
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setStatus("loading");
        try {
            // TODO: Replace with real API call
            await new Promise((r) => setTimeout(r, 800));
            setStatus("success");
            setEmail("");
        } catch {
            setStatus("idle");
        }
    };

    return (
        <section
            aria-labelledby="newsletter-heading"
            className="w-full max-w-xl mx-auto space-y-6"
        >
            <header>
                <h2
                        id="newsletter-heading"
                        className="font-serif text-3xl tracking-tight text-gray-900"
                >
                    Daily News Brief
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    A concise morning digest of the top stories—world, economy, tech, and more.
                </p>
            </header>

            <div className="border border-gray-200 rounded-md p-5 bg-white shadow-sm">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 sm:flex-row"
                    noValidate
                >
                    <label htmlFor="newsletter-email" className="sr-only">
                        Email address
                    </label>
                    <input
                        id="newsletter-email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (status === "success") setStatus("idle");
                        }}
                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                        required
                    />
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="rounded-md bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-black disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                    >
                        {status === "loading" ? "Subscribing..." : "Subscribe"}
                    </button>
                </form>

                {status === "success" && (
                    <p className="mt-2 text-sm text-green-600">
                        Thanks—please check your inbox to confirm.
                    </p>
                )}

                <div className="mt-5">
                        <p className="mb-2 text-xs font-medium tracking-wide text-gray-500">
                            Today&apos;s sample highlights
                        </p>
                        <ul className="space-y-1">
                            {sampleHeadlines.map((h) => (
                                <li key={h} className="text-sm text-gray-800 leading-snug flex">
                                    <span className="mt-1 mr-2 h-1.5 w-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                                    {h}
                                </li>
                            ))}
                        </ul>
                </div>

                <p className="mt-5 text-[11px] leading-relaxed text-gray-500">
                    No spam. One email on weekday mornings. Unsubscribe anytime.
                </p>
            </div>
        </section>
    );
}
