"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ForgotPasswordPage() {
  const { forgotPassword, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await forgotPassword(email.trim());
    setMessage(res.message);
    setMessageType(res.success ? 'success' : 'error');
    if (res.success) {
      // after a short delay navigate to reset password with prefilled email
      setTimeout(() => {
        router.push(`/reset-password?email=${encodeURIComponent(email.trim())}`);
      }, 1200);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center">
          <div className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'serif' }}>
            <Image src="/logo.png" alt="The Pioneer" width={200} height={80} />
          </div>
        </Link>
        <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">Forgot your password?</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email address and we will send you an OTP.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
            </div>
            {message && (
              <div className={`text-sm rounded px-3 py-2 ${messageType === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}> 
                {message}
              </div>
            )}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1a59a9] hover:bg-[#1a59a9] disabled:opacity-60"
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </div>
          </form>
          <div className="mt-6 text-center text-sm">
            <Link href="/login" className="text-[#1a59a9] hover:text-[#1a59a9]">Back to sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
