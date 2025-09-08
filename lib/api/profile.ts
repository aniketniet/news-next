// lib/api/profile.ts
// Profile API client for user profile management

export interface ProfileData {
  id: number;
  name: string;
  email: string;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: ProfileData;
}

export interface UpdateProfileData {
  name: string;
  email: string;
}

export interface ApiResult {
  success: boolean;
  message: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProfile(token: string): Promise<ProfileData> {
  if (!BASE_URL) throw new Error('NEXT_PUBLIC_API_URL not configured');
  
  const res = await fetch(`${BASE_URL}/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });

  console.log('fetchProfile response status:', res);

  if (!res.ok) {
    throw new Error(`Profile fetch failed: ${res.status}`);
  }

  const json = await res.json() as ProfileResponse;
  
  if (!json.success) {
    throw new Error(json.message || 'Failed to fetch profile');
  }

  return json.data;
}

export async function updateProfile(
  token: string, 
  profileData: UpdateProfileData
): Promise<ApiResult> {
  if (!BASE_URL) throw new Error('NEXT_PUBLIC_API_URL not configured');
  
  const formData = new URLSearchParams();
  formData.append('name', profileData.name);
  formData.append('email', profileData.email);

  const res = await fetch(`${BASE_URL}/profile`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });

  const json = await res.json();
  
  return {
    success: json.success || false,
    message: json.message || 'Profile update failed',
  };
}
