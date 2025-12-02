export interface SubscriptionPlan {
  id: number;
  name: string;
  price: string;
  selling_price: string;
  points: string;
  status: number;
  description: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface ParsedSubscriptionPlan extends Omit<SubscriptionPlan, 'points'> {
  features: {
    ad_free?: boolean;
    newsletter?: boolean;
    early_access?: boolean;
    articles_per_day?: string;
    exclusive_content?: boolean;
  };
}

export interface RazorpayOrder {
  id: string; // Razorpay order_id
  amount: number; // in paise
  currency: string; // e.g., INR
  key: string; // Razorpay key to use in checkout
}

export interface PaymentVerification {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  user_id: string;
  subscription_id: string;
  amount: string; // in paise
  name: string;
  email: string;
  phone: string;
  pincode: string;
  address: string;
}

import Cookies from 'js-cookie';

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// Get user token from localStorage or auth context
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  // Prefer cookie set by AuthContext, fallback to any localStorage token if present
  const cookieToken = Cookies.get('auth_token');

  return cookieToken;
}

export async function fetchSubscriptionPlans(): Promise<ParsedSubscriptionPlan[]> {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE}/subscriptions/plans`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch subscription plans');
    }

    const result = await response.json();
    if (result.success && result.data) {
      return result.data.map((plan: SubscriptionPlan): ParsedSubscriptionPlan => ({
        ...plan,
        features: JSON.parse(plan.points || '{}'),
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    throw error;
  }
}

export async function createRazorpayOrder(amount: number): Promise<RazorpayOrder> {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE}/subscriptions/razorpay/order`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        amount: amount.toString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create Razorpay order');
    }

    const result = await response.json();
    // API returns: { success: true, order_id: string, amount: number, currency: string, key: string }
    if (result?.success && result?.order_id) {
      return {
        id: result.order_id,
        amount: Number(result.amount),
        currency: String(result.currency || 'INR'),
        key: String(result.key || ''),
      };
    }
    throw new Error('Invalid response from server');
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
}

export async function verifyPayment(paymentData: PaymentVerification): Promise<boolean> {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE}/subscriptions/razorpay/verify`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        razorpay_order_id: paymentData.razorpay_order_id,
        razorpay_payment_id: paymentData.razorpay_payment_id,
        razorpay_signature: paymentData.razorpay_signature,
        user_id: paymentData.user_id,
        subscription_id: paymentData.subscription_id,
        amount: paymentData.amount,
        name: paymentData.name,
        email: paymentData.email,
        phone: paymentData.phone,
        pincode: paymentData.pincode,
        address: paymentData.address,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to verify payment');
    }

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
}
