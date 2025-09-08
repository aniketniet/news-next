"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/footer";
import {
  fetchSubscriptionPlans,
  createRazorpayOrder,
  verifyPayment,
  ParsedSubscriptionPlan,
} from "@/lib/api/subscription";

// Razorpay types
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function SubscriptionPage() {
  const { user, ready } = useAuth();
  const router = useRouter();
  const [plans, setPlans] = useState<ParsedSubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      router.push("/login");
      return;
    }

    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.head.appendChild(script);

    loadPlans();

    return () => {
      document.head.removeChild(script);
    };
  }, [user, router]);

  const loadPlans = async () => {
    try {
      setLoading(true);
      const subscriptionPlans = await fetchSubscriptionPlans();
      setPlans(subscriptionPlans);
    } catch (error) {
      setError("Failed to load subscription plans");
      console.error("Error loading plans:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (plan: ParsedSubscriptionPlan) => {
    if (!user) return;

    try {
      setPaymentLoading(true);
      setError(null);

      // Convert selling price to smallest currency unit (paise for INR)
      const amount = Math.round(parseFloat(plan.selling_price));

      // Create Razorpay order
      const order = await createRazorpayOrder(amount);

      // Razorpay options
      const options = {
        // Prefer key from API response
        key:
          order.key ||
          process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
          "rzp_test_your_key_id",
        amount: order.amount,
        currency: order.currency,
        name: "The Pioneer",
        description: plan.description,
        order_id: order.id,
        handler: async function (response: any) {
          try {
            // Verify payment
            const verified = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              user_id: user.id.toString(),
              subscription_id: plan.id.toString(),
              amount: amount.toString(),
            });

            if (verified) {
              setSuccess("Subscription activated successfully!");
              setTimeout(() => {
                router.push("/profile");
              }, 2000);
            } else {
              setError("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            setError("Payment verification failed. Please try again.");
            console.error("Payment verification error:", error);
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#FCCD04",
        },
        modal: {
          ondismiss: function () {
            setPaymentLoading(false);
          },
        },
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      setError("Failed to initiate payment. Please try again.");
      console.error("Payment error:", error);
    } finally {
      setPaymentLoading(false);
    }
  };

  if (!ready || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      {/* Subscription Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get unlimited access to premium content, ad-free reading, and
            exclusive features.
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-700 border border-red-200 max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-700 border border-green-200 max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {success}
            </div>
          </div>
        )}

        {/* Subscription Plans */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading subscription plans...</p>
            </div>
          </div>
        ) : plans.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No subscription plans available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
              >
                {/* Plan Header */}
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-8 text-center">
                  <h3 className="text-2xl font-bold text-black mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-black">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-lg line-through opacity-70">
                        ₹{plan.price}
                      </span>
                      <span className="text-3xl font-bold">
                        ₹{plan.selling_price}
                      </span>
                    </div>
                    <span className="text-sm opacity-80">per {plan.type}</span>
                  </div>
                </div>

                {/* Plan Features */}
                <div className="p-6">
                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  <ul className="space-y-3 mb-8">
                    {plan.features.ad_free && (
                      <li className="flex items-center gap-3">
                        <svg
                          className="w-5 h-5 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">
                          Ad-free reading experience
                        </span>
                      </li>
                    )}
                    {plan.features.newsletter && (
                      <li className="flex items-center gap-3">
                        <svg
                          className="w-5 h-5 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">
                          Premium newsletter access
                        </span>
                      </li>
                    )}
                    {plan.features.early_access && (
                      <li className="flex items-center gap-3">
                        <svg
                          className="w-5 h-5 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">
                          Early access to breaking news
                        </span>
                      </li>
                    )}
                    {plan.features.exclusive_content && (
                      <li className="flex items-center gap-3">
                        <svg
                          className="w-5 h-5 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">
                          Exclusive premium content
                        </span>
                      </li>
                    )}
                    {plan.features.articles_per_day && (
                      <li className="flex items-center gap-3">
                        <svg
                          className="w-5 h-5 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">
                          {plan.features.articles_per_day === "unlimited"
                            ? "Unlimited"
                            : plan.features.articles_per_day}{" "}
                          articles per day
                        </span>
                      </li>
                    )}
                  </ul>

                  <button
                    onClick={() => handleSubscribe(plan)}
                    disabled={paymentLoading}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-black font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {paymentLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        Subscribe Now
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Benefits Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Why Choose Premium?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Ad-Free Experience
              </h3>
              <p className="text-gray-600">
                Enjoy uninterrupted reading without any advertisements.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v2m0 0v14a2 2 0 01-2 2H5a2 2 0 01-2-2V4m0 0h18"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Exclusive Content
              </h3>
              <p className="text-gray-600">
                Access to premium articles and exclusive interviews.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Early Access
              </h3>
              <p className="text-gray-600">
                Be the first to read breaking news and important updates.
              </p>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
