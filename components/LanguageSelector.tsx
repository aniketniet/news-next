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
    // Get current language from cookie or default to English
    const updateCurrentLang = () => {
      const langCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('googtrans='));
      
      if (langCookie) {
        const cookieValue = langCookie.split('=')[1];
        if (cookieValue && cookieValue !== '') {
          const langCode = cookieValue.split('/').pop() || 'en';
          const foundLang = languages.find(l => l.code === langCode);
          if (foundLang) {
            setCurrentLang(foundLang);
          }
        } else {
          setCurrentLang(languages[0]); // English
        }
      } else {
        setCurrentLang(languages[0]); // English
      }
    };

    // Check initially
    updateCurrentLang();

    // Also check when Google Translate select changes
    const select = document.querySelector<HTMLSelectElement>('#google_translate_element select');
    if (select) {
      select.addEventListener('change', updateCurrentLang);
      return () => select.removeEventListener('change', updateCurrentLang);
    }

    // Periodically check for cookie changes
    const interval = setInterval(updateCurrentLang, 1000);
    return () => clearInterval(interval);
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

    // Trigger Google Translate
    const select = document.querySelector<HTMLSelectElement>('#google_translate_element select');
    
    if (select) {
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
          return value === '' || value === '0' || (!value.includes('/') && value.includes('en'));
        });
      } else {
        // For other languages, find option containing the language code
        targetOption = options.find(opt => {
          const value = opt.value;
          return value.includes(`/${targetLang}`) || value.includes(targetLang);
        });
      }

      if (targetOption) {
        select.value = targetOption.value;
        // Trigger change event
        const event = new Event('change', { bubbles: true });
        select.dispatchEvent(event);
        
        // Also try click event
        select.click();
      }
    } else {
      // Fallback: use cookie method and reload
      const domain = window.location.hostname;
      const langCode = lang.code === 'en' ? '' : lang.code;
      const cookieValue = langCode ? `/en/${langCode}` : '';
      document.cookie = `googtrans=${cookieValue}; path=/; domain=${domain}`;
      
      // Small delay before reload to ensure cookie is set
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
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

