'use client';
import { useState, useEffect, useRef } from 'react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>(languages[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Get current language from cookie or default to English
    const updateCurrentLang = () => {
      const langCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('googtrans='));
      
      if (langCookie) {
        const cookieValue = langCookie.split('=')[1];
        if (cookieValue && cookieValue !== '' && cookieValue !== 'null') {
          // Parse cookie value like "/en/hi" or "/en/fr"
          const parts = cookieValue.split('/');
          const langCode = parts.length > 1 ? parts[parts.length - 1] : 'en';
          const foundLang = languages.find(l => l.code === langCode);
          if (foundLang) {
            setCurrentLang(foundLang);
            return;
          }
        }
      }
      setCurrentLang(languages[0]); // English
    };

    // Check initially
    updateCurrentLang();

    // Listen for Google Translate ready event
    const handleTranslateReady = () => {
      updateCurrentLang();
      const select = document.querySelector<HTMLSelectElement>('#google_translate_element select');
      if (select) {
        select.addEventListener('change', updateCurrentLang);
      }
    };

    window.addEventListener('googleTranslateReady', handleTranslateReady);

    // Also check when Google Translate select changes
    const checkSelect = () => {
      const select = document.querySelector<HTMLSelectElement>('#google_translate_element select');
      if (select) {
        select.addEventListener('change', updateCurrentLang);
        return true;
      }
      return false;
    };

    // Try to find select element, with retries
    let selectCheckAttempts = 0;
    const maxSelectChecks = 20;
    const selectInterval = setInterval(() => {
      if (checkSelect() || selectCheckAttempts >= maxSelectChecks) {
        clearInterval(selectInterval);
      }
      selectCheckAttempts++;
    }, 200);

    // Periodically check for cookie changes
    const cookieInterval = setInterval(updateCurrentLang, 2000);

    return () => {
      window.removeEventListener('googleTranslateReady', handleTranslateReady);
      clearInterval(selectInterval);
      clearInterval(cookieInterval);
      const select = document.querySelector<HTMLSelectElement>('#google_translate_element select');
      if (select) {
        select.removeEventListener('change', updateCurrentLang);
      }
    };
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const changeLanguage = (lang: Language) => {
    setCurrentLang(lang);
    setIsOpen(false);

    // Always use cookie method for reliability, especially on server
    setLanguageCookie(lang);
    
    // Also try to trigger select element if available (for immediate feedback)
    setTimeout(() => {
      const select = document.querySelector<HTMLSelectElement>('#google_translate_element select');
      
      if (select && select.options.length > 0) {
        // Map language codes to Google Translate format
        const langMap: { [key: string]: string } = {
          'en': '',
          'hi': 'hi',
          'fr': 'fr',
          'ar': 'ar',
          'ta': 'ta',
          'te': 'te',
        };

        const targetLang = langMap[lang.code] || '';
        
        // Find the option that matches the language
        const options = Array.from(select.options);
        let targetOption = null;

        if (lang.code === 'en') {
          // For English, find option with empty value or that contains 'en' but not other languages
          targetOption = options.find(opt => {
            const value = opt.value;
            return value === '' || value === '0' || value === 'auto' || (!value.includes('/') && value.includes('en'));
          });
        } else {
          // For other languages, find option containing the language code
          targetOption = options.find(opt => {
            const value = opt.value;
            return value.includes(`/${targetLang}`) || value.includes(`|${targetLang}`) || value === targetLang;
          });
        }

        if (targetOption && select.value !== targetOption.value) {
          // Only change if different from current value
          select.value = targetOption.value;
          
          // Create and dispatch multiple event types for better compatibility
          const events = ['change', 'input', 'blur'];
          events.forEach(eventType => {
            const event = new Event(eventType, { bubbles: true, cancelable: true });
            select.dispatchEvent(event);
          });
          
          // Also try native change trigger
          if ('createEvent' in document) {
            const evt = document.createEvent('HTMLEvents');
            evt.initEvent('change', true, true);
            select.dispatchEvent(evt);
          }
        }
      }
    }, 100);
  };

  const setLanguageCookie = (lang: Language) => {
    // Get domain - handle both localhost and production
    const hostname = window.location.hostname;
    let domain = hostname;
    
    // For production domains, use the root domain
    if (hostname.includes('dailypioneer.com')) {
      domain = '.dailypioneer.com';
    } else if (hostname !== 'localhost' && !hostname.startsWith('127.0.0.1') && !hostname.startsWith('192.168.')) {
      // Extract root domain
      const parts = hostname.split('.');
      if (parts.length >= 2) {
        domain = '.' + parts.slice(-2).join('.');
      }
    }

    const langCode = lang.code === 'en' ? '' : lang.code;
    const cookieValue = langCode ? `/en/${langCode}` : '';
    
    // First, clear existing cookie by setting it to empty with past date
    const pastDate = new Date(0).toUTCString();
    if (domain.startsWith('.')) {
      document.cookie = `googtrans=; path=/; domain=${domain}; expires=${pastDate}`;
      // Also clear without domain
      document.cookie = `googtrans=; path=/; expires=${pastDate}`;
    } else {
      document.cookie = `googtrans=; path=/; expires=${pastDate}`;
    }
    
    // Small delay to ensure cookie is cleared
    setTimeout(() => {
      // Set new cookie with proper domain - set multiple times to ensure it sticks
      const setCookie = (cookieString: string) => {
        document.cookie = cookieString;
      };
      
      if (domain.startsWith('.')) {
        // Set with domain
        setCookie(`googtrans=${cookieValue}; path=/; domain=${domain}; max-age=31536000; SameSite=Lax`);
        // Also set without domain as fallback
        setCookie(`googtrans=${cookieValue}; path=/; max-age=31536000; SameSite=Lax`);
      } else {
        setCookie(`googtrans=${cookieValue}; path=/; max-age=31536000; SameSite=Lax`);
      }
      
      // Force reload to apply translation - use cache-busting for server
      setTimeout(() => {
        const currentUrl = window.location.href.split('?')[0].split('#')[0];
        // Add cache-busting parameters to force server to recognize language change
        const separator = currentUrl.includes('?') ? '&' : '?';
        window.location.href = `${currentUrl}${separator}_lang=${lang.code}&_t=${Date.now()}`;
      }, 100);
    }, 50);
  };

  // Hide Google Translate bar continuously
  useEffect(() => {
    const hideTranslateBar = () => {
      // Hide all Google Translate bars and banners
      const elementsToHide = [
        '.skiptranslate',
        '.goog-te-banner-frame',
        'body > div[id^="google_translate"]:not(#google_translate_element)',
        '#google_translate_element + div',
      ];

      elementsToHide.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el: any) => {
          if (el && el.id !== 'google_translate_element') {
            el.style.display = 'none';
            el.style.visibility = 'hidden';
            el.style.height = '0';
            el.style.maxHeight = '0';
            el.style.overflow = 'hidden';
            el.style.opacity = '0';
            el.style.position = 'absolute';
            el.style.top = '-9999px';
          }
        });
      });

      // Hide iframe
      const iframes = document.querySelectorAll('iframe[src*="translate.googleapis.com"]');
      iframes.forEach((iframe: any) => {
        const parent = iframe.closest('.goog-te-banner-frame, .skiptranslate');
        if (parent) {
          (parent as HTMLElement).style.display = 'none';
        }
      });
    };

    // Run immediately and set up observer
    hideTranslateBar();
    const observer = new MutationObserver(hideTranslateBar);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    // Also run on language change
    const interval = setInterval(hideTranslateBar, 500);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-black/70 hover:text-black transition-colors px-2 py-1.5 rounded hover:bg-gray-100"
        aria-label="Select language"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>
        <span className="text-xs sm:text-sm font-medium hidden sm:inline">
          {currentLang.nativeName}
        </span>
        <span className="text-xs sm:text-sm font-medium sm:hidden">
          {currentLang.code.toUpperCase()}
        </span>
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[160px]">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors flex items-center justify-between ${
                  currentLang.code === lang.code ? 'bg-gray-50 font-medium' : ''
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-gray-900">{lang.nativeName}</span>
                  <span className="text-xs text-gray-500">{lang.name}</span>
                </div>
                {currentLang.code === lang.code && (
                  <svg
                    className="w-4 h-4 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hidden Google Translate element */}
      <div id="google_translate_element" className="hidden" />
    </div>
  );
}

