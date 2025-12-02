"use client";

import { useState, useMemo } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/footer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createRazorpayOrder, verifyPayment } from "@/lib/api/subscription";
import { useAuth } from "@/contexts/AuthContext";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface SubscriptionPlan {
  id: string;
  name: string;
  duration: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  offer: string;
  type: "magazine-single" | "magazine-both" | "newspaper";
  colorClass: string;
}

interface UserFormData {
  name: string;
  email: string;
  phone: string;
  pincode: string;
  address: string;
}

export default function SubscriptionPage() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    phone: "",
    pincode: "",
    address: "",
  });
  const [errors, setErrors] = useState<Partial<UserFormData>>({});

  // Updated subscription plans based on requirements - memoized to prevent re-renders
  const subscriptionPlans: SubscriptionPlan[] = useMemo(() => [
    {
      id: "plan-a",
      name: "Plan A",
      duration: "6 Months",
      description: "Magazine only (any one)",
      price: 150,
      originalPrice: 300,
      discountPercent: 50,
      offer: "Pay ₹150 for 3 months + 3 months FREE",
      type: "magazine-single",
      colorClass: "bg-gradient-to-b from-purple-700 to-purple-500",
    },
    {
      id: "plan-b",
      name: "Plan B",
      duration: "12 Months",
      description: "Magazine only (any one)",
      price: 300,
      originalPrice: 600,
      discountPercent: 50,
      offer: "Pay ₹300 for 6 months + 6 months FREE",
      type: "magazine-single",
      colorClass: "bg-gradient-to-b from-green-700 to-green-400",
    },
    {
      id: "plan-c",
      name: "Plan C",
      duration: "6 Months",
      description: "Both Magazines",
      price: 300,
      originalPrice: 600,
      discountPercent: 50,
      offer: "Pay ₹300 for 3 months + 3 months FREE",
      type: "magazine-both",
      colorClass: "bg-gradient-to-b from-orange-700 to-orange-400",
    },
    {
      id: "plan-d",
      name: "Plan D",
      duration: "12 Months",
      description: "Both Magazines",
      price: 600,
      originalPrice: 1200,
      discountPercent: 50,
      offer: "Pay ₹600 for 6 months + 6 months FREE",
      type: "magazine-both",
      colorClass: "bg-gradient-to-b from-teal-700 to-teal-400",
    },
    {
      id: "plan-e",
      name: "Plan E",
      duration: "12 Months",
      description: "Newspaper only",
      price: 1199,
      originalPrice: 1862,
      discountPercent: 36,
      offer: "The Pioneer (Print) ₹1199 for 12 months (with complimentary magazine)",
      type: "newspaper",
      colorClass: "bg-gradient-to-b from-blue-700 to-blue-500",
    },
  ], []);

  const magazinePlans = useMemo(() => subscriptionPlans.filter(
    (plan) => plan.type === "magazine-single" || plan.type === "magazine-both"
  ), [subscriptionPlans]);

  // Split plans: A, B, C in first row | D, E in second row
  const firstRowPlans = useMemo(() => subscriptionPlans.filter(
    (plan) => ["plan-a", "plan-b", "plan-c"].includes(plan.id)
  ), [subscriptionPlans]);

  const secondRowPlans = useMemo(() => subscriptionPlans.filter(
    (plan) => ["plan-d", "plan-e"].includes(plan.id)
  ), [subscriptionPlans]);
  
  const newspaperPlans = useMemo(() => subscriptionPlans.filter(
    (plan) => plan.type === "newspaper"
  ), [subscriptionPlans]);

  const handleChoosePlan = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      pincode: "",
      address: "",
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<UserFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async () => {
    if (!validateForm() || !selectedPlan) return;

    setIsLoading(true);

    try {
      // Load Razorpay script
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        alert("Failed to load payment gateway. Please try again.");
        setIsLoading(false);
        return;
      }

      // Create Razorpay order - send amount in rupees
      // API will handle conversion to paise internally
      const amountInRupees = selectedPlan.price;
      const orderData = await createRazorpayOrder(amountInRupees);

      // Open Razorpay checkout
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "The Pioneer",
        description: `${selectedPlan.name} - ${selectedPlan.description}`,
        order_id: orderData.id,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        handler: async function (response: any) {
          try {
            // Verify payment with all user data
            const verificationResult = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              user_id: user?.id || "",
              subscription_id: selectedPlan.id,
              amount: amountInRupees.toString(),
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              pincode: formData.pincode,
              address: formData.address,
            });

            if (verificationResult) {
              alert("Payment successful! Your subscription is now active.");
              setIsModalOpen(false);
              setSelectedPlan(null);
              setFormData({
                name: "",
                email: "",
                phone: "",
                pincode: "",
                address: "",
              });
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            alert("Payment verification failed. Please contact support.");
          }
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
          },
        },
        theme: {
          color: "#F97316",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setIsLoading(false);
    } catch (error) {
      console.error("Payment initiation error:", error);
      alert("Failed to initiate payment. Please try again.");
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <SiteHeader />

      {/* Subscription Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Subscription Plans Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Subscription Plans
          </h2>
          <p className="text-center text-gray-600">
            Choose from Magazine, Both Magazines, or Newspaper subscriptions
          </p>
        </div>

        {/* First Row: Plan A, B, C */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-20 mb-24">
          {firstRowPlans.map((plan) => (
            <div key={plan.id} className="relative">
              {/* Colored Header */}
              <div
                className={`absolute -top-10 left-1/2 transform -translate-x-1/2 -translate-y-14 ${plan.colorClass} text-white text-center py-4 px-4 shadow-2xl z-10 w-[85%]`}
                style={{ boxShadow: "0 15px 25px rgba(0,0,0,0.35)" }}
              >
                <h3 className="text-sm font-extrabold mb-1 uppercase tracking-wide">
                  {plan.name}
                </h3>
                <h4 className="text-base font-bold mb-1">{plan.duration}</h4>
                <div className="mb-1">
                  <div className="text-xs line-through text-gray-300">
                    ₹{plan.originalPrice}
                  </div>
                  <div className="text-2xl font-extrabold">₹{plan.price}</div>
                </div>
                <div className="text-xs uppercase tracking-wide font-semibold">
                  {plan.discountPercent}% OFF
                </div>
              </div>

              {/* Main Card Body */}
              <div className="bg-white shadow-xl border border-gray-200 pt-16 pb-5 px-4 mt-6 rounded-lg h-full flex flex-col">
                {/* Features List */}
                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-teal-500 mr-2 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700 font-semibold text-sm">
                      {plan.description}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-teal-500 mr-2 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-green-600 font-semibold text-sm">
                      {plan.offer}
                    </span>
                  </li>
                </ul>

                <button
                  onClick={() => handleChoosePlan(plan)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-4 uppercase tracking-wide transition-colors rounded-md text-sm"
                >
                  CHOOSE PLAN
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Second Row: Plan D, E */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto pt-20 mb-16">
          {secondRowPlans.map((plan) => (
            <div key={plan.id} className="relative">
              {/* Colored Header */}
              <div
                className={`absolute -top-10 left-1/2 transform -translate-x-1/2 -translate-y-14 ${plan.colorClass} text-white text-center py-4 px-4 shadow-2xl z-10 w-[85%] `}
                style={{ boxShadow: "0 15px 25px rgba(0,0,0,0.35)" }}
              >
                <h3 className="text-sm font-extrabold mb-1 uppercase tracking-wide">
                  {plan.name}
                </h3>
                <h4 className="text-base font-bold mb-1">{plan.duration}</h4>
                <div className="mb-1">
                  <div className="text-xs line-through text-gray-300">
                    ₹{plan.originalPrice}
                  </div>
                  <div className="text-2xl font-extrabold">₹{plan.price}</div>
                </div>
                <div className="text-xs uppercase tracking-wide font-semibold">
                  {plan.discountPercent}% OFF
                </div>
              </div>

              {/* Main Card Body */}
              <div className="bg-white shadow-xl border border-gray-200 pt-16 pb-5 px-4 mt-6 rounded-lg h-full flex flex-col">
                {/* Features List */}
                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-teal-500 mr-2 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700 font-semibold text-sm">
                      {plan.description}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-teal-500 mr-2 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-green-600 font-semibold text-sm">
                      {plan.offer}
                    </span>
                  </li>
                </ul>

                <button
                  onClick={() => handleChoosePlan(plan)}
                  className={`w-full ${plan.type === "newspaper" ? "bg-blue-500 hover:bg-blue-600" : "bg-orange-500 hover:bg-orange-600"} text-white font-bold py-2.5 px-4 uppercase tracking-wide transition-colors rounded-md text-sm`}
                >
                  CHOOSE PLAN
                </button>
              </div>
            </div>
          ))}
        </div>

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

      {/* Subscription Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Complete Your Subscription
            </DialogTitle>
            <DialogDescription>
              {selectedPlan && (
                <span className="text-gray-600">
                  {selectedPlan.name} - {selectedPlan.description} ({selectedPlan.duration}) - ₹{selectedPlan.price}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-gray-700">
                Full Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your full name"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name}</span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-700">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone" className="text-gray-700">
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter 10-digit phone number"
                maxLength={10}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">{errors.phone}</span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="pincode" className="text-gray-700">
                Pincode *
              </Label>
              <Input
                id="pincode"
                value={formData.pincode}
                onChange={(e) => handleInputChange("pincode", e.target.value)}
                placeholder="Enter 6-digit pincode"
                maxLength={6}
                className={errors.pincode ? "border-red-500" : ""}
              />
              {errors.pincode && (
                <span className="text-red-500 text-sm">{errors.pincode}</span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address" className="text-gray-700">
                Delivery Address *
              </Label>
              <textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter your complete delivery address"
                rows={3}
                className={`flex w-full rounded-md border ${
                  errors.address ? "border-red-500" : "border-input"
                } bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring`}
              />
              {errors.address && (
                <span className="text-red-500 text-sm">{errors.address}</span>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              {isLoading ? "Processing..." : `Pay ₹${selectedPlan?.price || 0}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <SiteFooter />
    </div>
  );
}