"use client";

import { useEffect, useMemo, useState } from "react";
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

interface APIPlan {
  id: number;
  name: string;
  price: string;
  selling_price: string;
  points: string;
  status: number;
  description: string;
  type: string;
  plan_type: string;
  duration_days: number;
  created_at: string;
  updated_at: string;
}

interface SubscriptionPlan {
  id: number;
  name: string;
  duration: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  features: string[];
  type: string;
  plan_type: string;
  colorClass: string;
  code: "A" | "B" | "C" | "D" | "E";
}

interface UserFormData {
  phone: string;
  pincode: string;
  address: string;
}

type MagazineOption = "Exotica" | "Essentia" | "Both";

const BLOCKED_PINS = new Set([
  // Greater Noida
  "201310", // OMICRON 2, GAMMA 2, KASNA
  "201312", // G B UNIVERSITY
  "203201", // DANKOR
  // Noida
  "201301", // SECTOR 46, SECTOR 44 AMARPALI, SECTOR 143, SEC 168
  "201305", // SECTOR 137
  // Noida Extension
  "201318", // MAHAGUN MART, GAUR CITY
  "201309", // AJNARA LEE GARDEN
  "201009", // ARIHANT ARDEN, PRATIK GRAND SEC 12 GHAZIABAD
  "201306", // PANCHSHEEL GREEN
  "201307", // CLEO COUNTY SEC 121
  // Ghaziabad
  "201013", // GOVINDPURAM
  // Gurgaon
  "122101", // BADSHAHPUR
  "122052", // IMT MANESAR & SECTOR-1
  "122103", // SOHNA
  "122102", // BHONDSI
  "123501", // BAWAL CHOWK GURGAON
  "122413", // RAO HOTEL PACHGAWA MANESAR
  // South Delhi
  "110010", // SUBROTO PARK DEPOT
]);

function isDelhiNCRPincodeAllowed(pincode: string) {
  if (!/^\d{6}$/.test(pincode)) return false;
  if (BLOCKED_PINS.has(pincode)) return false;

  const pin = Number(pincode);
  const isDelhi = pin >= 110001 && pin <= 110099;
  const isGurgaon = pin >= 122001 && pin <= 122499;
  const isNoida = pin >= 201301 && pin <= 201318;
  const isGhaziabad = pin >= 201001 && pin <= 201014;
  const isFaridabad = pin >= 121001 && pin <= 121013;

  return isDelhi || isGurgaon || isNoida || isGhaziabad || isFaridabad;
}

export default function SubscriptionPage() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPlans, setIsLoadingPlans] = useState(true);
  const [apiPlans, setApiPlans] = useState<APIPlan[]>([]);
  const [magazineOption, setMagazineOption] = useState<MagazineOption | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    phone: "",
    pincode: "",
    address: "",
  });
  const [errors, setErrors] = useState<Partial<UserFormData>>({});
  const [planErrors, setPlanErrors] = useState<{ magazineOption?: string }>({});

  const pincodeTrimmed = formData.pincode.trim();
  const isPincodeComplete = /^\d{6}$/.test(pincodeTrimmed);
  const isPincodeBlocked = isPincodeComplete && BLOCKED_PINS.has(pincodeTrimmed);
  const isDelhiNCRAllowed = isPincodeComplete && isDelhiNCRPincodeAllowed(pincodeTrimmed);

  // Serviceability depends on plan:
  // - All plans: blocked pincodes are not serviceable
  // - Plan E: only Delhi NCR pincodes are allowed
  const isPincodeServiceable = useMemo(() => {
    if (!isPincodeComplete) return true; // don't show feedback until 6 digits entered
    if (isPincodeBlocked) return false;
    if (selectedPlan?.code === "E") return isDelhiNCRAllowed;
    return true;
  }, [isPincodeComplete, isPincodeBlocked, isDelhiNCRAllowed, selectedPlan?.code]);

  const pincodeHelperMessage = useMemo(() => {
    if (!isPincodeComplete) return "";
    if (isPincodeBlocked) {
      return "Sorry, no subscription plans are currently available for your location. This area is not serviceable.";
    }
    if (selectedPlan?.code === "E" && !isDelhiNCRAllowed) {
      return "Not serviceable area: Plan E (News-only) is available only for Delhi NCR pincodes.";
    }
    return "";
  }, [isPincodeComplete, isPincodeBlocked, isDelhiNCRAllowed, selectedPlan?.code]);

  // Color classes for plans
  const planColors = [
    "bg-gradient-to-b from-black to-neutral-800",
    "bg-gradient-to-b from-neutral-900 to-neutral-700",
    "bg-gradient-to-b from-black to-neutral-700",
    "bg-gradient-to-b from-neutral-900 to-neutral-800",
    "bg-gradient-to-b from-black to-neutral-800",
  ];

  // Fetch plans from API
  useEffect(() => {
    const loadPlans = async () => {
      try {
        setIsLoadingPlans(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/plans`);
        const result = await response.json();
        if (result.success && result.data) {
          setApiPlans(result.data);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
      } finally {
        setIsLoadingPlans(false);
      }
    };
    loadPlans();
  }, []);

  // Parse API plans into display format
  const subscriptionPlans: SubscriptionPlan[] = useMemo(() => {
    return apiPlans.map((plan, index) => {
      const originalPrice = parseFloat(plan.price);
      const sellingPrice = parseFloat(plan.selling_price);
      const discountPercent = Math.round(((originalPrice - sellingPrice) / originalPrice) * 100);
      
      // Parse features from points JSON
      let features: string[] = [];
      try {
        const pointsObj = JSON.parse(plan.points || "{}");
        features = Object.keys(pointsObj).filter(key => pointsObj[key] === "true" || pointsObj[key] === true);
      } catch (e) {
        features = [];
      }

      // Calculate duration string
      let duration = "";
      if (plan.duration_days >= 365) {
        duration = `${Math.round(plan.duration_days / 365)} Year${plan.duration_days >= 730 ? "s" : ""}`;
      } else if (plan.duration_days >= 30) {
        duration = `${Math.round(plan.duration_days / 30)} Months`;
      } else {
        duration = `${plan.duration_days} Days`;
      }

      return {
        id: plan.id,
        name: plan.name,
        duration,
        description: plan.plan_type === "Print_Newspaper" ? "Newspaper" : "Magazine",
        price: sellingPrice,
        originalPrice,
        discountPercent,
        features,
        type: plan.type,
        plan_type: plan.plan_type,
        colorClass: planColors[index % planColors.length],
        code: (["A", "B", "C", "D", "E"][index] as SubscriptionPlan["code"]) || "E",
      };
    });
  }, [apiPlans]);

  // Split plans: A, B, C in first row | D, E in second row
  const firstRowPlans = useMemo(() => subscriptionPlans.slice(0, 3), [subscriptionPlans]);
  const secondRowPlans = useMemo(() => subscriptionPlans.slice(3), [subscriptionPlans]);

  const handleChoosePlan = (plan: SubscriptionPlan) => {
    if (!user?.id) {
      alert("You are not logged in. Redirecting to login page...");
      // Store redirect URL to come back after login
      sessionStorage.setItem("redirectAfterLogin", "/subscription");
      window.location.href = "/login";
      return;
    }
    setSelectedPlan(plan);
    // Plan A/B: user must choose Exotica or Essentia
    // Plan C/D: includes both
    if (plan.code === "A" || plan.code === "B") setMagazineOption(null);
    else if (plan.code === "C" || plan.code === "D") setMagazineOption("Both");
    else setMagazineOption(null);
    setFormData({
      phone: "",
      pincode: "",
      address: "",
    });
    setErrors({});
    setPlanErrors({});
    setIsModalOpen(true);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<UserFormData> = {};
    const newPlanErrors: { magazineOption?: string } = {};

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    const pincode = formData.pincode.trim();

    if (!pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    } else if (BLOCKED_PINS.has(pincode)) {
      newErrors.pincode = "Sorry, no subscription plans are currently available for your location. This area is not serviceable.";
    } else if (selectedPlan?.code === "E" && !isDelhiNCRPincodeAllowed(pincode)) {
      newErrors.pincode = "Not serviceable area: Plan E (News-only) is available only for Delhi NCR pincodes.";
    }

    // Only validate address if pincode is serviceable
    if (isPincodeServiceable && pincode.length === 6) {
      if (!formData.address.trim()) {
        newErrors.address = "Address is required";
      }
    }

    setErrors(newErrors);

    if ((selectedPlan?.code === "A" || selectedPlan?.code === "B") && !magazineOption) {
      newPlanErrors.magazineOption = "Please choose Exotica or Essentia.";
    }
    setPlanErrors(newPlanErrors);

    return Object.keys(newErrors).length === 0 && Object.keys(newPlanErrors).length === 0;
  };

  // const loadRazorpayScript = (): Promise<boolean> => {
  //   return new Promise((resolve) => {
  //     if (window.Razorpay) {
  //       resolve(true);
  //       return;
  //     }
  //     const script = document.createElement("script");
  //     script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //     script.onload = () => resolve(true);
  //     script.onerror = () => resolve(false);
  //     document.body.appendChild(script);
  //   });
  // };

  const handleSubmit = async () => {
    if (!validateForm() || !selectedPlan) return;
    if ((selectedPlan.code === "A" || selectedPlan.code === "B") && !magazineOption) return;

    setIsLoading(true);

    try {
      // Create Razorpay order - send amount in rupees
      const amountInRupees = selectedPlan.price;
      // const orderData = await createRazorpayOrder(amountInRupees);

      // Razorpay checkout is disabled. Run verify API directly using static Razorpay values.
      const STATIC_RAZORPAY_KEY =
        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_key_static";
      const STATIC_RAZORPAY_PAYMENT_ID = "pay_static";
      const STATIC_RAZORPAY_SIGNATURE = "sig_static";
      const STATIC_RAZORPAY_ORDER_ID = "order_static";

      // ---------------------------------------------
      // Razorpay Checkout (commented / reference only)
      // ---------------------------------------------
      // const options = {
      //   key: STATIC_RAZORPAY_KEY,
      //   amount: amountInRupees,
      //   currency: "INR",
      //   name: "The Pioneer",
      //   description: `${selectedPlan.name} - ${selectedPlan.description}`,
      //   order_id: STATIC_RAZORPAY_ORDER_ID,
      //   prefill: {
      //     name: user?.name || "",
      //     email: user?.email || "",
      //     contact: formData.phone,
      //   },
      //   handler: async function (response: any) {
      //     // const verificationResult = await verifyPayment({
      //     //   razorpay_order_id: response.razorpay_order_id,
      //     //   razorpay_payment_id: response.razorpay_payment_id,
      //     //   razorpay_signature: response.razorpay_signature,
      //     //   user_id: user?.id || "",
      //     //   subscription_id: selectedPlan.id.toString(),
      //     //   amount: amountInRupees.toString(),
      //     //   pincode: formData.pincode,
      //     //   address: formData.address,
      //     //   mobile: formData.phone,
      //     // });
      //   },
      //   theme: { color: "#000000" },
      // };
      // const razorpay = new window.Razorpay(options);
      // razorpay.open();

      const serviceNamesForPlanA = (() => {
        if (selectedPlan.code !== "A") return null;
        const chosen = magazineOption ?? "Exotica";
        // Requirement: Plan A must send 6 service names in payload.
        return [
          "News",
          "E-Paper",
          "Premium Articles",
          "Ad-Free Experience",
          "Early Access",
          chosen,
        ].join(",");
      })();

      const verificationResult = await verifyPayment({
        razorpay_order_id: STATIC_RAZORPAY_ORDER_ID,
        razorpay_payment_id: STATIC_RAZORPAY_PAYMENT_ID,
        razorpay_signature: STATIC_RAZORPAY_SIGNATURE,
        user_id: user?.id || "",
        subscription_id: selectedPlan.id.toString(),
        amount: amountInRupees.toString(),
        pincode: formData.pincode,
        address: formData.address,
        mobile: formData.phone,
        razorpay_key: STATIC_RAZORPAY_KEY,
        service_names: serviceNamesForPlanA ?? undefined,
        magazine_option:
          selectedPlan.code === "C" || selectedPlan.code === "D"
            ? "Both"
            : (magazineOption ?? undefined),
      });

      if (verificationResult) {
        alert("Your Request has been received ! Contact Soon.");
        setIsModalOpen(false);
        setSelectedPlan(null);
        setFormData({
          phone: "",
          pincode: "",
          address: "",
        });
      } else {
        alert("Request failed. Please contact support.");
      }

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
    <div className="min-h-screen bg-white">
      <SiteHeader />

      {/* Subscription Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Subscription Plans Header */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-3 sm:mb-4">
            Subscription Plans
          </h2>
          <p className="text-center text-gray-600 text-sm sm:text-base px-4 sm:px-0">
            Choose from Magazine, Both Magazines, or Newspaper subscriptions
          </p>
        </div>

        {/* First Row: Plan A, B, C */}
        {isLoadingPlans ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 space-y-24 sm:space-y-0 gap-6 sm:gap-8 max-w-5xl mx-auto pt-24 sm:pt-20 mb-16  sm:mb-24 px-2 sm:px-0">
          {firstRowPlans.map((plan) => (
            <div key={plan.id} className="relative">
              {/* Colored Header */}
              <div
                className={`absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 -translate-y-10 sm:-translate-y-14 ${plan.colorClass} text-white text-center py-3 sm:py-4 px-3 sm:px-4 shadow-2xl z-10 w-[90%] sm:w-[85%] rounded-lg sm:rounded-none`}
                style={{ boxShadow: "0 15px 25px rgba(0,0,0,0.35)" }}
              >
                <h3 className="text-xs sm:text-sm font-extrabold mb-1 uppercase tracking-wide">
                  {plan.name}
                </h3>
                <h4 className="text-sm sm:text-base font-bold mb-1">{plan.duration}</h4>
                <div className="mb-1">
                  <div className="text-xs line-through text-gray-300">
                    ₹{plan.originalPrice}
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold">₹{plan.price}</div>
                </div>
                <div className="text-xs uppercase tracking-wide font-semibold">
                  {plan.discountPercent}% OFF
                </div>
              </div>

              {/* Main Card Body */}
              <div className="bg-white shadow-xl border border-gray-200 pt-14 sm:pt-16 pb-4 sm:pb-5 px-3 sm:px-4 mt-4 sm:mt-6 rounded-lg h-full flex flex-col min-h-[180px] sm:min-h-[200px]">
                {/* Features List */}
                <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg
                        className="w-4 h-4 text-black mr-2 shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700 font-semibold text-xs sm:text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleChoosePlan(plan)}
                  className="w-full bg-black hover:bg-black/90 text-white font-bold py-2 sm:py-2.5 px-3 sm:px-4 uppercase tracking-wide transition-colors rounded-md text-xs sm:text-sm"
                >
                  CHOOSE PLAN
                </button>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* Second Row: Plan D, E */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 space-y-24 sm:space-y-0 sm:gap-8 max-w-3xl mx-auto pt-24 sm:pt-20 mb-12 sm:mb-16 px-2 sm:px-0">
          {secondRowPlans.map((plan) => (
            <div key={plan.id} className="relative">
              {/* Colored Header */}
              <div
                className={`absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 -translate-y-10 sm:-translate-y-14 ${plan.colorClass} text-white text-center py-3 sm:py-4 px-3 sm:px-4 shadow-2xl z-10 w-[90%] sm:w-[85%] rounded-lg sm:rounded-none`}
                style={{ boxShadow: "0 15px 25px rgba(0,0,0,0.35)" }}
              >
                <h3 className="text-xs sm:text-sm font-extrabold mb-1 uppercase tracking-wide">
                  {plan.name}
                </h3>
                <h4 className="text-sm sm:text-base font-bold mb-1">{plan.duration}</h4>
                <div className="mb-1">
                  <div className="text-xs line-through text-gray-300">
                    ₹{plan.originalPrice}
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold">₹{plan.price}</div>
                </div>
                <div className="text-xs uppercase tracking-wide font-semibold">
                  {plan.discountPercent}% OFF
                </div>
              </div>

              {/* Main Card Body */}
              <div className="bg-white shadow-xl border border-gray-200 pt-14 sm:pt-16 pb-4 sm:pb-5 px-3 sm:px-4 mt-4 sm:mt-6 rounded-lg h-full flex flex-col min-h-[180px] sm:min-h-[200px]">
                {/* Features List */}
                <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg
                        className="w-4 h-4 text-black mr-2 shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700 font-semibold text-xs sm:text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleChoosePlan(plan)}
                  className="w-full bg-black hover:bg-black/90 text-white font-bold py-2 sm:py-2.5 px-3 sm:px-4 uppercase tracking-wide transition-colors rounded-md text-xs sm:text-sm"
                >
                  CHOOSE PLAN
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-12 sm:mt-16 bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-6 sm:mb-8">
            Why Choose Premium?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-black"
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
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                Ad-Free Experience
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Enjoy uninterrupted reading without any advertisements.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-black"
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
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                Exclusive Content
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Access to premium articles and exclusive interviews.
              </p>
            </div>
            <div className="text-center sm:col-span-2 md:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-black"
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
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                Early Access
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
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
            {(selectedPlan?.code === "C" || selectedPlan?.code === "D") && (
              <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
                This plan includes <span className="font-semibold">both</span> magazines:{" "}
                <span className="font-semibold">Exotica</span> +{" "}
                <span className="font-semibold">Essentia</span>.
              </div>
            )}

            {selectedPlan?.code === "E" && (
              <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
                Services for this plan are available only in{" "}
                <span className="font-semibold">Delhi NCR</span>.
              </div>
            )}

            {(selectedPlan?.code === "A" || selectedPlan?.code === "B") && (
              <div className="grid gap-2">
                <Label className="text-gray-700">Choose Magazine *</Label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMagazineOption("Exotica");
                      if (planErrors.magazineOption) setPlanErrors({});
                    }}
                    className={`flex-1 border rounded-md px-3 py-2 text-sm font-semibold ${
                      magazineOption === "Exotica"
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-800 border-gray-300"
                    }`}
                  >
                    Exotica
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMagazineOption("Essentia");
                      if (planErrors.magazineOption) setPlanErrors({});
                    }}
                    className={`flex-1 border rounded-md px-3 py-2 text-sm font-semibold ${
                      magazineOption === "Essentia"
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-800 border-gray-300"
                    }`}
                  >
                    Essentia
                  </button>
                </div>
                {planErrors.magazineOption && (
                  <span className="text-red-500 text-sm">{planErrors.magazineOption}</span>
                )}
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="phone" className="text-gray-700">
                Mobile Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter 10-digit mobile number"
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
              {!errors.pincode && pincodeHelperMessage && (
                <span className="text-red-500 text-sm">{pincodeHelperMessage}</span>
              )}
            </div>

            {/* Only show address field if pincode is serviceable */}
            {isPincodeServiceable && isPincodeComplete && (
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
            )}
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
              className="bg-black hover:bg-black/90 text-white"
            >
              {isLoading ? "Processing..." : `Submit`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <SiteFooter />
    </div>
  );
}